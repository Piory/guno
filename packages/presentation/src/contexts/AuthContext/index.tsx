import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { authRepository } from '@core/infrastructure';
import { AuthProviderType } from '@core/domain';
import { useUseCases } from '../UseCaseContext';

export interface Props {
  userId: string | undefined;
  signIn: (provider: AuthProviderType) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<Props | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { getCurrentUserIdUseCase, signInUseCase, signOutUseCase } = useUseCases();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userId = await getCurrentUserIdUseCase.execute();
      setUserId(userId);
      setLoading(false);
    })();
    return authRepository.onAuthStateChange((status, userId) => {
      setUserId(userId);
      setLoading(false);
    });
  }, []);

  const value: Props = {
    userId: userId,
    signIn: async type => signInUseCase.execute(type),
    signOut: async () => signOutUseCase.execute(),
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
