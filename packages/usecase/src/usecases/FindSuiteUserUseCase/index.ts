import { SuiteUser, VUserDetailRepository } from '@core/domain';

export class FindSuiteUserUseCase {
  constructor(private readonly vUserDetailRepository: VUserDetailRepository) {}

  async execute(userId: string): Promise<SuiteUser | undefined> {
    const vUserDetail = await this.vUserDetailRepository.findByUserId(userId);
    if (!vUserDetail) {
      return undefined;
    }
    return new SuiteUser(vUserDetail);
  }
}
