import { AuthStatus } from '../types';

export interface AuthRepository {
  onAuthStateChange(callback: (authStatus: AuthStatus, userId: string | undefined) => void): () => void;

  getCurrentUserId(): Promise<string | undefined>;

  signInWithApple(): Promise<any>;

  signInWithGoogle(): Promise<any>;

  signInWithX(): Promise<any>;

  signInWithTwitch(): Promise<any>;

  signInWithDiscord(): Promise<any>;

  signInWithAnonymous(): Promise<any>;

  signOut(): Promise<any>;
}
