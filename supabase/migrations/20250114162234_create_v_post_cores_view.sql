CREATE VIEW v_post_cores AS
SELECT
    p.id AS post_id,
    p.user_id,
    p.referenced_post_id,
    p.text,
    coalesce(
            jsonb_agg(
                    jsonb_build_object(
                            'id', pm.id,
                            'post_id', pm.post_id,
                            'display_order', pm.display_order,
                            'type', pm.type,
                            'url', pm.url,
                            'created_at', pm.created_at,
                            'updated_at', pm.updated_at,
                            'deleted_at', pm.deleted_at
                    )
            ) FILTER (WHERE pm.id IS NOT NULL), '[]'::JSONB
    ) AS medias,
    p.created_at,
    p.updated_at,
    p.deleted_at
FROM t_posts p
         LEFT JOIN t_post_medias pm ON p.id = pm.post_id
GROUP BY p.id;

COMMENT ON VIEW v_post_cores IS e'@graphql({"primary_key_columns": ["post_id"]})';
COMMENT ON COLUMN v_post_cores.post_id IS '投稿ID';
COMMENT ON COLUMN v_post_cores.user_id IS 'ユーザーID';
COMMENT ON COLUMN v_post_cores.text IS 'テキスト';
COMMENT ON COLUMN v_post_cores.medias IS 'メディア一覧';
COMMENT ON COLUMN v_post_cores.created_at IS '作成日時';
COMMENT ON COLUMN v_post_cores.updated_at IS '更新日時';
COMMENT ON COLUMN v_post_cores.deleted_at IS '削除日時';
