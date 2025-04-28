import React, { ReactNode, createContext, useContext } from 'react';
import { SignInUseCase } from '@core/usecase';
import { useCaseContainer } from '../../composition';

export interface UseCaseContainer {
  readonly signInUseCase: SignInUseCase;
}

const UseCaseContext = createContext<UseCaseContainer>(useCaseContainer);

type ProviderProps = {
  container?: Partial<UseCaseContainer>;
  children: ReactNode;
};
export const UseCaseProvider: React.FC<ProviderProps> = ({ container = {}, children }) => {
  const value = { ...useCaseContainer, ...container };
  return <UseCaseContext.Provider value={value}>{children}</UseCaseContext.Provider>;
};

// カスタムフック
export function useUseCases(): UseCaseContainer {
  return useContext(UseCaseContext);
}
