CREATE TABLE t_user_profiles
(
    user_id           UUID         NOT NULL PRIMARY KEY REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    display_name      VARCHAR(20)  NOT NULL,
    avatar_url        VARCHAR(255),
    self_introduction VARCHAR(160) NOT NULL DEFAULT '',
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at        TIMESTAMPTZ
);
COMMENT ON TABLE t_user_profiles IS 'ユーザープロフィールテーブル';
COMMENT ON COLUMN t_user_profiles.user_id IS 'ユーザーID';
COMMENT ON COLUMN t_user_profiles.display_name IS '表示名';
COMMENT ON COLUMN t_user_profiles.avatar_url IS 'アバターURL';
COMMENT ON COLUMN t_user_profiles.self_introduction IS '自己紹介';
COMMENT ON COLUMN t_user_profiles.created_at IS '作成日時';
COMMENT ON COLUMN t_user_profiles.updated_at IS '更新日時';
COMMENT ON COLUMN t_user_profiles.deleted_at IS '削除日時';

-- Add row level security
ALTER TABLE t_user_profiles
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_user_profiles
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_user_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_user_profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_user_profiles
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_user_profiles
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
