CREATE TABLE t_user_post_favorites
(
    id         UUID        NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    post_id    BIGINT      NOT NULL REFERENCES t_posts ON DELETE RESTRICT ON UPDATE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,
    UNIQUE (user_id, post_id)
);
COMMENT ON TABLE t_user_post_favorites IS 'ユーザー投稿お気に入りテーブル';
COMMENT ON COLUMN t_user_post_favorites.id IS 'ID';
COMMENT ON COLUMN t_user_post_favorites.user_id IS 'ユーザーID';
COMMENT ON COLUMN t_user_post_favorites.post_id IS '投稿ID';
COMMENT ON COLUMN t_user_post_favorites.created_at IS '作成日時';
COMMENT ON COLUMN t_user_post_favorites.updated_at IS '更新日時';
COMMENT ON COLUMN t_user_post_favorites.deleted_at IS '削除日時';

-- Add index
CREATE INDEX ON t_user_post_favorites (post_id);

-- Add row level security
ALTER TABLE t_user_post_favorites
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users access"
    ON t_user_post_favorites
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_user_post_favorites
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_user_post_favorites
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_user_post_favorites
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_user_post_favorites
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
