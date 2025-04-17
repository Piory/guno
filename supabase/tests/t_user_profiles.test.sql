BEGIN;

SELECT plan(2);

-- ****************
-- t_user_profiles を更新した場合に、updated_at が自動で更新されることを確認する
-- ****************
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at,
                        confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at,
                        email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data,
                        raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
                        phone_change, phone_change_token, phone_change_sent_at, email_change_token_current,
                        email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated',
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

UPDATE public.t_user_profiles
SET display_name = 'updated_user'
WHERE user_id = '11111111-1111-1111-1111-111111111111';

SELECT is(
               (SELECT display_name FROM public.t_user_profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               'updated_user',
               '表示名が正しく更新されたことを確認'
       );

SELECT is(
               (SELECT updated_at != '2025-01-11 14:30:00.00000+00'
                FROM public.t_user_profiles
                WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               TRUE,
               'updated_at が自動で更新されることを確認'
       );

SELECT *
FROM finish();
ROLLBACK;
