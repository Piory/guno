import { create } from 'zustand';
import { SuiteUser } from '@core/domain';
import { useUseCases } from '../../contexts';

type Data = {
  data?: SuiteUser;
  isInitialized: boolean;
  isLoading: boolean;
  error?: Error;
};

type State = {
  userMap: Record<string, Data>;
  userIds: Array<string>;
};

type Action = {
  fetchUser: (userId: string) => Promise<void>;
  clearUser: (userId: string) => void;
};

export const useUserStore = create<State & Action>(set => {
  const { findSuiteUserUseCase } = useUseCases();
  return {
    userMap: {},
    userIds: [],
    fetchUser: async (userId: string) => {
      try {
        set(state => ({
          ...state,
          userMap: { ...state.userMap, [userId]: { isInitialized: false, isLoading: true, data: undefined } },
        }));
        const suiteUser = await findSuiteUserUseCase.execute(userId);
        console.log(suiteUser);
        if (suiteUser) {
          set(state => ({
            ...state,
            userMap: { ...state.userMap, [userId]: { isInitialized: true, isLoading: false, data: suiteUser } },
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    clearUser: async (userId: string) => {
      set(state => {
        const newUserMap = { ...state.userMap };
        delete newUserMap[userId];
        return {
          ...state,
          userMap: newUserMap,
          userIds: state.userIds.filter(id => id !== userId),
        };
      });
    },
  };
});
