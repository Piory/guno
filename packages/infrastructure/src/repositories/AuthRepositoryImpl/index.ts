import { authorize } from 'react-native-app-auth';
import { SupabaseClient } from '@supabase/supabase-js';
import { OAuthConfig } from '@core/shared';
import { AuthRepository } from '@core/domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async signInWithApple(): Promise<void> {
    // Implementation for signing in with Apple
  }

  async signInWithGoogle(): Promise<void> {
    const { idToken, accessToken } = await authorize(OAuthConfig.GOOGLE);
    await this.supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
      access_token: accessToken,
    });
  }

  async signInWithX(): Promise<void> {
    const { idToken, accessToken } = await authorize(OAuthConfig.X);
    await this.supabase.auth.signInWithIdToken({
      provider: 'twitter',
      token: idToken,
      access_token: accessToken,
    });
  }

  async signInWithTwitch(): Promise<void> {
    // Implementation for signing in with Twitch
  }

  async signInWithDiscord(): Promise<void> {
    const { idToken, accessToken } = await authorize(OAuthConfig.DISCORD);
    await this.supabase.auth.signInWithIdToken({
      provider: 'discord',
      token: idToken,
      access_token: accessToken,
    });
  }

  async signInWithAnonymous(): Promise<void> {
    await this.supabase.auth.signInAnonymously();
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
