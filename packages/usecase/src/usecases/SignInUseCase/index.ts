import { AuthProviderType, AuthRepository } from '@core/domain';

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(provider: AuthProviderType): Promise<void> {
    switch (provider) {
      case 'apple':
        await this.authRepository.signInWithApple();
        break;
      case 'google':
        await this.authRepository.signInWithGoogle();
        break;
      case 'x':
        await this.authRepository.signInWithX();
        break;
      case 'twitch':
        await this.authRepository.signInWithTwitch();
        break;
      case 'discord':
        await this.authRepository.signInWithDiscord();
        break;
      case 'anonymous':
        await this.authRepository.signInWithAnonymous();
        break;
    }
  }
}
