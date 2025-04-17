CREATE TYPE timeline_type AS ENUM ('follow');

CREATE TABLE t_user_timelines
(
    id         UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id    UUID             NOT NULL REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    type       TIMELINE_TYPE    NOT NULL,
    post_id    BIGINT           NOT NULL REFERENCES t_posts ON DELETE RESTRICT ON UPDATE RESTRICT,
    created_at TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ,
    UNIQUE (user_id, type, post_id)
);
COMMENT ON TABLE t_user_timelines IS 'ユーザータイムラインテーブル';
COMMENT ON COLUMN t_user_timelines.id IS 'ID';
COMMENT ON COLUMN t_user_timelines.user_id IS 'ユーザーID';
COMMENT ON COLUMN t_user_timelines.type IS 'タイムラインタイプ';
COMMENT ON COLUMN t_user_timelines.post_id IS '投稿ID';
COMMENT ON COLUMN t_user_timelines.created_at IS '作成日時';
COMMENT ON COLUMN t_user_timelines.updated_at IS '更新日時';
COMMENT ON COLUMN t_user_timelines.deleted_at IS '削除日時';

-- Add index
CREATE INDEX ON t_user_timelines (user_id);

-- Add row level security
ALTER TABLE t_user_timelines
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_user_timelines
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_user_timelines
    FOR INSERT
    TO authenticated
    WITH CHECK ((auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_user_timelines
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_user_timelines
    FOR DELETE
    TO authenticated
    USING ((auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_user_timelines
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
