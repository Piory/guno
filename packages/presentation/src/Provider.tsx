import React, { PropsWithChildren } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config.ts';
import { AuthProvider, UseCaseProvider } from './contexts';
import './locales/config/index.ts';

type Props = {
  theme: 'light' | 'dark';
};

export const Provider: React.FC<PropsWithChildren<Props>> = ({ children, theme }) => {
  return (
    <UseCaseProvider>
      <AuthProvider>
        <TamaguiProvider config={config} defaultTheme={theme}>
          {children}
        </TamaguiProvider>
      </AuthProvider>
    </UseCaseProvider>
  );
};
