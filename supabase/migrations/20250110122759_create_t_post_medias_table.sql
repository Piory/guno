CREATE TYPE media_type AS ENUM ('image', 'video');

CREATE TABLE t_post_medias
(
    id            UUID        NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id       BIGINT      NOT NULL REFERENCES t_posts ON DELETE RESTRICT ON UPDATE RESTRICT,
    display_order INT         NOT NULL,
    type          MEDIA_TYPE  NOT NULL,
    url           TEXT        NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL             DEFAULT CURRENT_TIMESTAMP,
    deleted_at    TIMESTAMPTZ,
    UNIQUE (post_id, display_order)
);
COMMENT ON TABLE t_post_medias IS '投稿メディアテーブル';
COMMENT ON COLUMN t_post_medias.id IS 'ID';
COMMENT ON COLUMN t_post_medias.post_id IS '投稿ID';
COMMENT ON COLUMN t_post_medias.display_order IS '表示順';
COMMENT ON COLUMN t_post_medias.type IS 'メディアタイプ';
COMMENT ON COLUMN t_post_medias.url IS 'URL';
COMMENT ON COLUMN t_post_medias.created_at IS '作成日時';
COMMENT ON COLUMN t_post_medias.updated_at IS '更新日時';
COMMENT ON COLUMN t_post_medias.deleted_at IS '削除日時';

-- Add row level security
ALTER TABLE t_post_medias
    ENABLE ROW LEVEL SECURITY;

-- Add row level security policy
CREATE POLICY "Allow authenticated users access"
    ON t_post_medias
    FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Create own user"
    ON t_post_medias
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = (SELECT user_id
                              FROM t_posts
                              WHERE t_posts.id = t_post_medias.post_id) AND
                (auth.jwt() ->> 'is_anonymous')::BOOLEAN = false
    );

CREATE POLICY "Update own user"
    ON t_post_medias
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = (SELECT user_id
                         FROM t_posts
                         WHERE t_posts.id = t_post_medias.post_id) AND
           (auth.jwt() ->> 'is_anonymous')::BOOLEAN = false)
    WITH CHECK (auth.uid() = (SELECT user_id
                              FROM t_posts
                              WHERE t_posts.id = t_post_medias.post_id) AND
                (auth.jwt() ->> 'is_anonymous')::BOOLEAN = false
    );

CREATE POLICY "Delete own user"
    ON t_post_medias
    FOR DELETE
    TO authenticated
    USING (auth.uid() = (SELECT user_id
                         FROM t_posts
                         WHERE t_posts.id = t_post_medias.post_id) AND
           (auth.jwt() ->> 'is_anonymous')::BOOLEAN = false);

CREATE TRIGGER automatic_updating_updated_at
    BEFORE UPDATE
    ON t_post_medias
    FOR EACH ROW
EXECUTE FUNCTION automatic_updating_updated_at();
