CREATE OR REPLACE FUNCTION create_post_for_repost(
    timeline_type TIMELINE_TYPE,
    referenced_post_id BIGINT
)
    RETURNS BIGINT AS
$$
DECLARE
    current_user_id UUID   := auth.uid();
    post_id         BIGINT := generate_snowflake_id();
    follow_count    INT;
BEGIN
    -- 投稿を作成
    INSERT INTO t_posts (id, user_id, referenced_post_id)
    VALUES (post_id, current_user_id, referenced_post_id);

    -- 自分のタイムラインに投稿を追加
    INSERT INTO t_user_timelines (user_id, type, post_id)
    VALUES (current_user_id, timeline_type, post_id);

    -- フォロワーのタイムラインにも投稿を追加（存在すれば）
    SELECT COUNT(*)
    INTO follow_count
    FROM t_user_follows
    WHERE follow_user_id = current_user_id;

    IF follow_count > 0 THEN
        INSERT INTO t_user_timelines (user_id, type, post_id)
        SELECT user_id, timeline_type, post_id
        FROM t_user_follows
        WHERE follow_user_id = current_user_id;
    END IF;

    RETURN post_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION create_post_for_repost IS 'リポスト投稿作成';
