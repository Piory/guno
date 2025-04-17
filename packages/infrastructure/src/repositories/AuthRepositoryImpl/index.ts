import { AuthRepository } from '@core/domain';
import { authorize } from 'react-native-app-auth';
import { OAuthConfig } from '@core/shared';

export class AuthRepositoryImpl implements AuthRepository {
  signInWithApple = async () => {
    // Implementation for signing in with Apple
  };

  signInWithGoogle = async () => {
    try {
      const authState = await authorize(OAuthConfig.GOOGLE);
      console.log(authState);
    } catch (e) {
      console.error(e);
    }
  };

  signInWithX = async () => {
    // Implementation for signing in with X
  };

  signInWithTwitch = async () => {
    // Implementation for signing in with Twitch
  };

  signInWithDiscord = async () => {
    try {
      const authState = await authorize(OAuthConfig.DISCORD);
      console.log(authState);
    } catch (e) {
      console.error(e);
    }
  };

  signOut = async () => {
    // Implementation for signing out
  };
}
