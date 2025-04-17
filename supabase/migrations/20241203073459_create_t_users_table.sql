CREATE EXTENSION IF NOT EXISTS citext;

-- Create table
CREATE TABLE t_users
(
    id          UUID PRIMARY KEY NOT NULL REFERENCES auth.users,
    screen_name CITEXT           NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at  TIMESTAMPTZ
);
-- Add comment
COMMENT ON TABLE t_users IS 'ユーザーテーブル';
COMMENT ON COLUMN t_users.id IS 'ユーザーID';
COMMENT ON COLUMN t_users.screen_name IS 'ハンドル';
COMMENT ON COLUMN t_users.created_at IS '作成日時';
COMMENT ON COLUMN t_users.updated_at IS '更新日時';
COMMENT ON COLUMN t_users.deleted_at IS '削除日時';

-- Add row level security
ALTER TABLE t_users
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_users
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_users
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_users
    FOR DELETE
    TO authenticated
    USING (auth.uid() = id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE OR REPLACE FUNCTION handle_new_user() RETURNS TRIGGER AS
$$
DECLARE
    -- screen_name のデフォルト値
    default_screen_name VARCHAR(16);
BEGIN
    BEGIN
        -- screen_name のデフォルト値を設定
        SELECT left(md5(NEW.id::TEXT), 16) INTO default_screen_name;
        -- ユーザー情報を登録
        INSERT INTO public.t_users(id, screen_name, created_at, updated_at)
        VALUES (NEW.id, default_screen_name, NEW.created_at, NEW.updated_at);
        -- 匿名ユーザーの場合はプロフィール登録をスキップ
        IF NEW.is_anonymous THEN
            RETURN NEW;
        END IF;
        -- ユーザープロフィールを登録
        IF NEW.raw_app_meta_data ->> 'provider' = 'email' THEN
            INSERT INTO public.t_user_profiles(user_id, display_name, created_at, updated_at)
            VALUES (NEW.id, default_screen_name, NEW.created_at, NEW.updated_at);
            RETURN NEW;
        ELSE
            INSERT INTO public.t_user_profiles(user_id, display_name, avatar_url, created_at, updated_at)
            VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'avatar_url',
                    NEW.created_at,
                    NEW.updated_at);
            RETURN NEW;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION handle_new_user IS '新規ユーザー登録時の処理';

CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE handle_new_user();

CREATE FUNCTION automatic_updating_updated_at()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION automatic_updating_updated_at IS 'updated_at の自動更新';

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_users
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
