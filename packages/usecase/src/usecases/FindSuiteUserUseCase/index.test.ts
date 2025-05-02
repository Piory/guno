import { mock } from 'jest-mock-extended';
import { fakeVUserDetail } from '@core/shared';
import { SuiteUser, VUserDetailRepository } from '@core/domain';
import { FindSuiteUserUseCase } from './index.ts';

describe('FindSuiteUserUseCase', () => {
  const mockVUserDetailRepository = mock<VUserDetailRepository>();
  const useCase = new FindSuiteUserUseCase(mockVUserDetailRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    describe('正常系', () => {
      it('VUserDetailRepository#findByUserId が呼ばれること', async () => {
        const vUserDetail = fakeVUserDetail();
        const userId = vUserDetail.user_id!;
        mockVUserDetailRepository.findByUserId.mockResolvedValue(vUserDetail);
        expect(await useCase.execute(userId)).toEqual(new SuiteUser(vUserDetail));
        expect(mockVUserDetailRepository.findByUserId).toHaveBeenCalledTimes(1);
        expect(mockVUserDetailRepository.findByUserId).toHaveBeenCalledWith(userId);
      });

      it('VUserDetailRepository#findByUserId が undefined を返すとき、undefined を返すこと', async () => {
        const userId = 'user_id';
        mockVUserDetailRepository.findByUserId.mockResolvedValue(undefined);
        expect(await useCase.execute(userId)).toBeUndefined();
        expect(mockVUserDetailRepository.findByUserId).toHaveBeenCalledTimes(1);
        expect(mockVUserDetailRepository.findByUserId).toHaveBeenCalledWith(userId);
      });
    });
  });
});
