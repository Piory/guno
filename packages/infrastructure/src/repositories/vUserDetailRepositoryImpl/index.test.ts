import { SupabaseClient } from '@supabase/supabase-js';
import { mock } from 'jest-mock-extended';
import { fakeVUserDetail } from '@core/shared';
import { VUserDetailRepositoryImpl } from './index.ts';

jest.mock('react-native-config', () => ({}));
jest.mock('react-native-app-auth');
jest.mock('@supabase/supabase-js');
describe('VUserDetailRepositoryImpl', () => {
  const vUserDetail = fakeVUserDetail();
  const mockFrom = jest.fn();
  const mockSelect = jest.fn();
  const mockEq = jest.fn();
  const mockMaybeSingle = jest.fn();
  const mockSupabaseClient = mock<SupabaseClient>(
    {
      from: mockFrom.mockImplementation(() => ({
        select: mockSelect.mockImplementation(() => ({
          eq: mockEq.mockImplementation(() => ({
            maybeSingle: mockMaybeSingle.mockResolvedValue({ data: vUserDetail }),
          })),
        })),
      })),
    },
    { deep: true },
  );
  const repository = new VUserDetailRepositoryImpl(mockSupabaseClient);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#findByUserId', () => {
    describe('正常系', () => {
      it(`eq に user_id, と渡した引数が渡されていること`, async () => {
        const userId = vUserDetail.user_id!;
        expect(await repository.findByUserId(userId)).toBe(vUserDetail);
        expect(mockFrom).toHaveBeenCalledTimes(1);
        expect(mockFrom).toHaveBeenCalledWith('v_user_details');
        expect(mockSelect).toHaveBeenCalledTimes(1);
        expect(mockSelect).toHaveBeenCalledWith();
        expect(mockEq).toHaveBeenCalledTimes(1);
        expect(mockEq).toHaveBeenCalledWith('user_id', userId);
        expect(mockMaybeSingle).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#findByScreenName', () => {
    describe('正常系', () => {
      it(`eq に screen_name, と渡した引数が渡されていること`, async () => {
        const screenName = vUserDetail.screen_name!;
        expect(await repository.findByScreenName(screenName)).toBe(vUserDetail);
        expect(mockFrom).toHaveBeenCalledTimes(1);
        expect(mockFrom).toHaveBeenCalledWith('v_user_details');
        expect(mockSelect).toHaveBeenCalledTimes(1);
        expect(mockSelect).toHaveBeenCalledWith();
        expect(mockEq).toHaveBeenCalledTimes(1);
        expect(mockEq).toHaveBeenCalledWith('screen_name', screenName);
        expect(mockMaybeSingle).toHaveBeenCalledTimes(1);
      });
    });
  });
});
