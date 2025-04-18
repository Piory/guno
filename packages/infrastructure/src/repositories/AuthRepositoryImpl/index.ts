import { authorize } from 'react-native-app-auth';
import { OAuthConfig } from '@core/shared';
import { AuthRepository } from '@core/domain';

export class AuthRepositoryImpl implements AuthRepository {
  async signInWithApple(): Promise<void> {
    // Implementation for signing in with Apple
  }

  async signInWithGoogle(): Promise<void> {
    await authorize(OAuthConfig.GOOGLE);
  }

  async signInWithX(): Promise<void> {
    // Implementation for signing in with X
  }

  async signInWithTwitch(): Promise<void> {
    // Implementation for signing in with Twitch
  }

  async signInWithDiscord(): Promise<void> {
    await authorize(OAuthConfig.DISCORD);
  }

  async signOut(): Promise<void> {
    // Implementation for signing out
  }
}
