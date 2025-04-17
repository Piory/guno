BEGIN;

SELECT plan(10);

-- ****************
-- SetUp
-- ****************
-- UserID: 11111111-1111-1111-1111-111111111111 のユーザーを作成
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES ('10000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated',
        'authenticated', 'admin@email.com', '$2a$10$7HloIuRU8136LMux12Vceu8x57OuqrRDpUsIlHLjM4I85LwzUiHRm',
        '2025-01-11 14:30:00.000000+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{
    "provider": "google",
    "providers": [
      "google"
    ]
  }', '{
    "full_name": "FullName",
    "avatar_url": "AvatarUrl"
  }', NULL, '2025-01-11 14:30:00.000000+00', '2025-01-11 14:30:00.000000+00', NULL, NULL, '', '', NULL, '', 0,
        NULL, '', NULL);

-- UserID: 22222222-2222-2222-2222-222222222222 のユーザーを作成
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES ('20000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated',
        'authenticated', 'follower-1@email.com', '$2a$10$7HloIuRU8136LMux12Vceu8x57OuqrRDpUsIlHLjM4I85LwzUiHRm',
        '2025-01-11 14:30:00.000000+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{
    "provider": "google",
    "providers": [
      "google"
    ]
  }', '{
    "full_name": "FullName",
    "avatar_url": "AvatarUrl"
  }', NULL, '2025-01-11 14:30:00.000000+00', '2025-01-11 14:30:00.000000+00', NULL, NULL, '', '', NULL, '', 0,
        NULL, '', NULL);

-- UserID: 33333333-3333-3333-3333-333333333333 のユーザーを作成
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES ('30000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated',
        'authenticated', 'follower-2@email.com', '$2a$10$7HloIuRU8136LMux12Vceu8x57OuqrRDpUsIlHLjM4I85LwzUiHRm',
        '2025-01-11 14:30:00.000000+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{
    "provider": "google",
    "providers": [
      "google"
    ]
  }', '{
    "full_name": "FullName",
    "avatar_url": "AvatarUrl"
  }', NULL, '2025-01-11 14:30:00.000000+00', '2025-01-11 14:30:00.000000+00', NULL, NULL, '', '', NULL, '', 0,
        NULL, '', NULL);

-- ログインユーザーのセッションを作成
SELECT set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', true);

SELECT create_post('follow', 'post-text', '[]');

-- ログインユーザーのセッションを作成
SELECT set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', true);

-- ****************
-- create_post_for_repost 関数を実行した場合に、t_posts にデータが作成されること、
-- ****************

SELECT create_post_for_repost('follow', (SELECT id
                                         FROM t_posts
                                         WHERE user_id = '22222222-2222-2222-2222-222222222222'));

SELECT is(
               (SELECT (text, referenced_post_id) FROM t_posts WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               ROW (NULL::TEXT, (SELECT id
                                 FROM t_posts
                                 WHERE user_id = '22222222-2222-2222-2222-222222222222')),
               't_posts に新しい投稿が作成されたこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_post_medias
                WHERE post_id = (SELECT id FROM t_posts WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               0,
               't_post_medias にデータが作成されないこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_user_timelines
                WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               1,
               't_user_timelines に1件のデータが作成されたこと'
       );

SELECT is(
               (SELECT ROW (type, post_id)
                FROM t_user_timelines
                WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               ROW ('follow'::TIMELINE_TYPE, (SELECT id
                                              FROM t_posts
                                              WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               '自分のタイムラインに新しい投稿が追加されたこと'
       );

DELETE
FROM t_user_timelines
WHERE user_id = '11111111-1111-1111-1111-111111111111'
   OR user_id = '22222222-2222-2222-2222-222222222222';
DELETE
FROM t_posts
WHERE user_id = '11111111-1111-1111-1111-111111111111'
   OR user_id = '22222222-2222-2222-2222-222222222222';

-- ****************
-- create_post 関数を実行した場合に、フォロワーが存在する場合は、フォロワーの t_user_timelines にも新しい投稿が追加されること
-- ****************

-- UserId: 11111111-1111-1111-1111-111111111111 のフォロワーを作成
INSERT INTO t_user_follows (user_id, follow_user_id)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111'),
       ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111');

-- ログインユーザーのセッションを作成
SELECT set_config('request.jwt.claim.sub', '22222222-2222-2222-2222-222222222222', true);

SELECT create_post('follow', 'post-text', '[]');

-- ログインユーザーのセッションを作成
SELECT set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', true);

SELECT create_post_for_repost('follow', (SELECT id
                                         FROM t_posts
                                         WHERE user_id = '22222222-2222-2222-2222-222222222222'));

SELECT is(
               (SELECT (text, referenced_post_id) FROM t_posts WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               ROW (NULL::TEXT, (SELECT id
                                 FROM t_posts
                                 WHERE user_id = '22222222-2222-2222-2222-222222222222')),
               't_posts に新しい投稿が作成されたこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_post_medias
                WHERE post_id = (SELECT id FROM t_posts WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               0,
               't_post_medias にデータが作成されないこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_user_timelines
                WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               1,
               '自分の t_user_timelines に1件のデータが作成されたこと'
       );

SELECT is(
               (SELECT ROW (type, post_id)
                FROM t_user_timelines
                WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               ROW ('follow'::TIMELINE_TYPE, (SELECT id
                                              FROM t_posts
                                              WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               '自分のタイムラインに新しい投稿が追加されたこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_user_timelines
                WHERE user_id = '22222222-2222-2222-2222-222222222222'
                  AND post_id = (SELECT id
                                 FROM t_posts
                                 WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               1,
               'フォロワーの t_user_timelines に1件のデータが作成されたこと'
       );

SELECT is(
               (SELECT COUNT(*)::INT
                FROM t_user_timelines
                WHERE user_id = '33333333-3333-3333-3333-333333333333'
                  AND post_id = (SELECT id
                                 FROM t_posts
                                 WHERE user_id = '11111111-1111-1111-1111-111111111111')),
               1,
               'フォロワーの t_user_timelines に1件のデータが作成されたこと'
       );

DELETE
FROM t_user_follows
WHERE follow_user_id = '11111111-1111-1111-1111-111111111111';
DELETE
FROM t_user_timelines
WHERE user_id = '11111111-1111-1111-1111-111111111111'
   OR user_id = '22222222-2222-2222-2222-222222222222'
   OR user_id = '33333333-3333-3333-3333-333333333333';
DELETE
FROM t_posts
WHERE user_id = '11111111-1111-1111-1111-111111111111'
   OR user_id = '22222222-2222-2222-2222-222222222222';

SELECT *
FROM finish();
ROLLBACK;
