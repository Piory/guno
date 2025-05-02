import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';
import { AuthRepository } from '@core/domain';
import { GetCurrentUserIdUseCase } from './index.ts';

describe('GetCurrentUserIdUseCase', () => {
  const mockAuthRepository = mock<AuthRepository>();
  const useCase = new GetCurrentUserIdUseCase(mockAuthRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    describe('正常系', () => {
      it('AuthRepository#getCurrentUserId が呼ばれること', async () => {
        const userId = faker.string.uuid();
        mockAuthRepository.getCurrentUserId.mockResolvedValue(userId);
        const result = await useCase.execute();
        expect(mockAuthRepository.getCurrentUserId).toHaveBeenCalledTimes(1);
        expect(result).toBe(userId);
      });
    });
  });
});
