CREATE VIEW v_post_engagements AS
WITH "current_user" AS (
    SELECT auth.uid() AS uid
)
SELECT
    p.id AS post_id,
    (SELECT EXISTS(
        SELECT 1 FROM t_posts WHERE referenced_post_id = p.id AND user_id = cu.uid
    )) AS is_reposted,
    (SELECT count(*) FROM t_posts WHERE referenced_post_id = p.id) AS repost_count,
    (SELECT EXISTS(
        SELECT 1 FROM t_user_post_favorites WHERE post_id = p.id AND user_id = cu.uid
    )) AS is_favorited,
    (SELECT count(*) FROM t_user_post_favorites WHERE post_id = p.id) AS favorite_count
FROM t_posts p, "current_user" cu;

COMMENT ON VIEW v_post_engagements IS e'@graphql({"primary_key_columns": ["post_id"]})';
COMMENT ON COLUMN v_post_engagements.post_id IS '投稿ID';
COMMENT ON COLUMN v_post_engagements.is_reposted IS 'リポスト済みか否か';
COMMENT ON COLUMN v_post_engagements.repost_count IS 'リポスト数';
COMMENT ON COLUMN v_post_engagements.is_favorited IS 'お気に入り済みか否か';
COMMENT ON COLUMN v_post_engagements.favorite_count IS 'お気に入り数';
