CREATE TABLE t_posts
(
    id                 BIGINT      NOT NULL PRIMARY KEY DEFAULT generate_snowflake_id(),
    user_id            UUID        NOT NULL REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    referenced_post_id BIGINT REFERENCES t_posts ON DELETE RESTRICT ON UPDATE RESTRICT,
    text               TEXT,
    created_at         TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    deleted_at         TIMESTAMPTZ,
    UNIQUE (user_id, referenced_post_id)
);
COMMENT ON TABLE t_posts IS '投稿テーブル';
COMMENT ON COLUMN t_posts.id IS '投稿ID';
COMMENT ON COLUMN t_posts.user_id IS 'ユーザーID';
COMMENT ON COLUMN t_posts.referenced_post_id IS 'リポストした投稿ID';
COMMENT ON COLUMN t_posts.text IS 'テキスト';
COMMENT ON COLUMN t_posts.created_at IS '作成日時';
COMMENT ON COLUMN t_posts.updated_at IS '更新日時';
COMMENT ON COLUMN t_posts.deleted_at IS '削除日時';

-- Add index
CREATE INDEX ON t_posts (user_id);

-- Add row level security
ALTER TABLE t_posts
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_posts
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_posts
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_posts
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_posts
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
