CREATE OR REPLACE FUNCTION create_post(
    timeline_type TIMELINE_TYPE,
    text TEXT,
    medias JSONB
)
    RETURNS BIGINT AS
$$
DECLARE
    current_user_id UUID   := auth.uid();
    post_id         BIGINT := generate_snowflake_id();
    follow_count    INT;
BEGIN
    -- 投稿を作成
    INSERT INTO t_posts (id, user_id, text)
    VALUES (post_id, current_user_id, text);

    -- 投稿メディアがある場合に追加
    IF medias IS NOT NULL AND jsonb_array_length(medias) > 0 THEN
        INSERT INTO t_post_medias (post_id, display_order, type, url)
        SELECT post_id, idx, (media ->> 'type')::MEDIA_TYPE, media ->> 'url'
        FROM jsonb_array_elements(medias) WITH ORDINALITY arr(media, idx)
        ORDER BY idx;
    END IF;

    -- 自分のタイムラインに追加
    INSERT INTO t_user_timelines (user_id, type, post_id)
    VALUES (current_user_id, timeline_type, post_id);

    -- フォロワーがいれば、フォロワーのタイムラインに追加
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

COMMENT ON FUNCTION create_post IS '投稿作成';
