import * as domain from '@core/domain';
import { inject, singleton } from 'tsyringe';
import { DI_TYPES } from '@core/shared';

@singleton()
export class SignInUseCase {
  constructor(
    @inject(DI_TYPES.AuthRepository)
    private readonly authRepository: domain.AuthRepository,
  ) {}

  async execute(type: 'apple' | 'google' | 'x' | 'twitch' | 'discord'): Promise<void> {
    try {
      switch (type) {
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
        default:
          throw new Error('Invalid sign-in type');
      }
    } catch (error) {
      throw new Error('Sign in failed');
    }
  }
}
