CREATE VIEW v_posts AS
SELECT core.post_id,
       core.user_id,
       repost.post_id                       AS repost_post_id,
       repost.user_id                       AS repost_user_id,
       repost.created_at                    AS repost_created_at,
       repost.updated_at                    AS repost_updated_at,
       repost.deleted_at                    AS repost_deleted_at,
       CASE
           WHEN core.referenced_post_id IS NULL THEN 'none'
           WHEN core.text IS NULL OR core.text = '' THEN 'repost'
           ELSE 'quote'
           END                              AS repost_type,
       COALESCE(repost.text, core.text)     AS display_text,
       COALESCE(repost.medias, core.medias) AS display_medias,
       CASE
           WHEN core.referenced_post_id IS NULL THEN NULL
           WHEN core.text IS NULL OR core.text = '' THEN NULL
           ELSE core.text
           END                              AS quote_text,
       CASE
           WHEN core.referenced_post_id IS NULL THEN NULL
           WHEN core.text IS NULL OR core.text = '' THEN NULL
           ELSE core.medias
           END                              AS quote_medias,
       eg.is_reposted,
       eg.repost_count,
       eg.is_favorited,
       eg.favorite_count,
       core.created_at,
       core.updated_at,
       core.deleted_at
FROM v_post_cores core
         LEFT JOIN v_post_cores repost ON repost.post_id = core.referenced_post_id
         LEFT JOIN v_post_engagements eg ON eg.post_id = COALESCE(core.referenced_post_id, core.post_id);

COMMENT ON VIEW v_posts IS e'@graphql({"primary_key_columns": ["post_id"]})';
COMMENT ON COLUMN v_posts.post_id IS '投稿ID';
COMMENT ON COLUMN v_posts.user_id IS '投稿またはリポストしたユーザーID';
COMMENT ON COLUMN v_posts.repost_post_id IS 'リポスト元投稿ID';
COMMENT ON COLUMN v_posts.repost_user_id IS 'リポスト元ユーザーID';
COMMENT ON COLUMN v_posts.repost_created_at IS 'リポスト元投稿の作成日時';
COMMENT ON COLUMN v_posts.repost_updated_at IS 'リポスト元投稿の更新日時';
COMMENT ON COLUMN v_posts.repost_deleted_at IS 'リポスト元投稿の削除日時';
COMMENT ON COLUMN v_posts.repost_type IS 'リポストタイプ';
COMMENT ON COLUMN v_posts.display_text IS '表示用テキスト';
COMMENT ON COLUMN v_posts.display_medias IS '表示用メディア一覧';
COMMENT ON COLUMN v_posts.quote_text IS '引用リポスト時のテキスト';
COMMENT ON COLUMN v_posts.quote_medias IS '引用リポスト時に添付されたメディア一覧';
COMMENT ON COLUMN v_posts.is_reposted IS 'リポスト済みか否か';
COMMENT ON COLUMN v_posts.repost_count IS 'リポスト数';
COMMENT ON COLUMN v_posts.is_favorited IS 'お気に入り済みか否か';
COMMENT ON COLUMN v_posts.favorite_count IS 'お気に入り数';
COMMENT ON COLUMN v_posts.created_at IS '作成日時';
COMMENT ON COLUMN v_posts.updated_at IS '更新日時';
COMMENT ON COLUMN v_posts.deleted_at IS '削除日時';
