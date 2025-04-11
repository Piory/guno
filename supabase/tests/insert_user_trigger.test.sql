BEGIN;

SELECT plan(4);

-- ****************
-- auth.users に新しいユーザーが作成されたときに trigger によって public.users にも新しいユーザーが作成されることを確認する
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

INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, provider_id)
VALUES ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111'::uuid, '{
  "sub": "11111111-1111-1111-1111-111111111111"
}', 'email', '2025-01-11 15:30:00.000000+00', '2025-01-11 14:30:00.000000+00', '2025-01-11 14:30:00.000000+00',
        '11111111-1111-1111-1111-111111111111'::uuid);

SELECT is(
               (SELECT id FROM auth.users WHERE id = '11111111-1111-1111-1111-111111111111'),
               '11111111-1111-1111-1111-111111111111',
               'auth.usersに新しいユーザーが作成されたことを確認'
       );
SELECT is(
               (SELECT id FROM public.t_users WHERE id = '11111111-1111-1111-1111-111111111111'),
               '11111111-1111-1111-1111-111111111111',
               'public.t_usersに新しいユーザーが作成されたことを確認'
       );
SELECT is(
               (SELECT display_name FROM public.t_user_profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               'FullName',
               'auth.users の raw_user_meta_data ->> full_name が public.t_user_profiles の display_name に反映されたことを確認'
       );
SELECT is(
               (SELECT avatar_url FROM public.t_user_profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'),
               'AvatarUrl',
               'auth.users の raw_user_meta_data ->> avatar_url が public.t_user_profiles の avatar_url に反映されたことを確認'
       );

SELECT *
FROM finish();
ROLLBACK;
