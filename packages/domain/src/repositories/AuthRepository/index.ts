export interface AuthRepository {
  signInWithApple(): Promise<any>;

  signInWithGoogle(): Promise<any>;

  signInWithX(): Promise<any>;

  signInWithTwitch(): Promise<any>;

  signInWithDiscord(): Promise<any>;

  signOut(): Promise<any>;
}
