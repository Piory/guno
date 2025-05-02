import { AuthRepository } from '@core/domain';

export class GetCurrentUserIdUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<string | undefined> {
    return this.authRepository.getCurrentUserId();
  }
}
