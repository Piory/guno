CREATE VIEW v_user_details AS
SELECT up.user_id,
       u.screen_name,
       up.display_name,
       up.avatar_url,
       up.self_introduction,
       (SELECT jsonb_agg(posts)
        FROM (SELECT *
              FROM v_posts
              WHERE user_id = u.id
              ORDER BY id DESC
              LIMIT 20) posts)       AS latest_posts,
       (SELECT jsonb_agg(posts)
        FROM (SELECT *
              FROM v_posts
              WHERE post_id IN (SELECT post_id
                           FROM t_user_post_favorites
                           WHERE user_id = u.id)
              ORDER BY id DESC
              LIMIT 20) posts)       AS favorite_posts,
       (SELECT count(*)
        FROM t_user_follows
        WHERE follow_user_id = u.id) AS follow_count,
       (SELECT count(*)
        FROM t_user_follows
        WHERE user_id = u.id)        AS follower_count,
       u.created_at,
       u.updated_at,
       u.deleted_at
FROM t_users u
         LEFT JOIN t_user_profiles up ON u.id = up.user_id;

COMMENT ON VIEW v_user_details IS 'ユーザー詳細ビュー';
COMMENT ON COLUMN v_user_details.user_id IS 'ユーザーID';
COMMENT ON COLUMN v_user_details.screen_name IS 'ハンドル';
COMMENT ON COLUMN v_user_details.display_name IS '表示名';
COMMENT ON COLUMN v_user_details.avatar_url IS 'アバターURL';
COMMENT ON COLUMN v_user_details.self_introduction IS '自己紹介';
COMMENT ON COLUMN v_user_details.latest_posts IS '最新の投稿';
COMMENT ON COLUMN v_user_details.favorite_posts IS 'お気に入りの投稿';
COMMENT ON COLUMN v_user_details.follow_count IS 'フォロー数';
COMMENT ON COLUMN v_user_details.follower_count IS 'フォロワー数';
COMMENT ON COLUMN v_user_details.created_at IS '作成日時';
COMMENT ON COLUMN v_user_details.updated_at IS '更新日時';
COMMENT ON COLUMN v_user_details.deleted_at IS '削除日時';
