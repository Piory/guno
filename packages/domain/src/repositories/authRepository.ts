import { AuthStatus } from '../types';

export interface AuthRepository {
  onAuthStateChange(callback: (authStatus: AuthStatus, userId: string | undefined) => void): () => void;

  getCurrentUserId(): Promise<string | undefined>;

  signInWithApple(): Promise<void>;

  signInWithGoogle(): Promise<void>;

  signInWithX(): Promise<void>;

  signInWithTwitch(): Promise<void>;

  signInWithDiscord(): Promise<void>;

  signInWithAnonymous(): Promise<void>;

  signOut(): Promise<void>;
}
