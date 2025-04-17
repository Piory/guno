CREATE TABLE t_user_follows
(
    id             BIGINT PRIMARY KEY NOT NULL DEFAULT generate_snowflake_id(),
    user_id        UUID               NOT NULL REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    follow_user_id UUID               NOT NULL REFERENCES t_users ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at     TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at     TIMESTAMPTZ,
    UNIQUE (user_id, follow_user_id)
);
COMMENT ON TABLE t_user_follows IS 'ユーザーフォローテーブル';
COMMENT ON COLUMN t_user_follows.id IS 'ID';
COMMENT ON COLUMN t_user_follows.user_id IS 'ユーザーID';
COMMENT ON COLUMN t_user_follows.follow_user_id IS 'フォロー対象ユーザーID';
COMMENT ON COLUMN t_user_follows.created_at IS '作成日時';
COMMENT ON COLUMN t_user_follows.updated_at IS '更新日時';
COMMENT ON COLUMN t_user_follows.deleted_at IS '削除日時';

-- Add index
CREATE INDEX ON t_user_follows (user_id);
CREATE INDEX ON t_user_follows (follow_user_id);

-- Add row level security
ALTER TABLE t_user_follows
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_user_follows
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_user_follows
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Update own user"
    ON t_user_follows
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE)
    WITH CHECK (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE POLICY "Delete own user"
    ON t_user_follows
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id AND (auth.jwt() ->> 'is_anonymous')::BOOLEAN = FALSE);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_user_follows
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
