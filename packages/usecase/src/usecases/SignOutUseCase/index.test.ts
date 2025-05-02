import { mock } from 'jest-mock-extended';
import { AuthRepository } from '@core/domain';
import { SignOutUseCase } from './index.ts';

describe('SignOutUseCase', () => {
  const mockAuthRepository = mock<AuthRepository>();
  const useCase = new SignOutUseCase(mockAuthRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    describe('正常系', () => {
      it('AuthRepository#signOut が呼ばれること', async () => {
        await useCase.execute();
        expect(mockAuthRepository.signOut).toHaveBeenCalledTimes(1);
      });
    });
  });
});
