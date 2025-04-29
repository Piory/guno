import React, { PropsWithChildren } from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config.ts';
import { UseCaseProvider } from './contexts/UseCaseContainer';
import './locales/config/index.ts';

type Props = {
  theme: 'light' | 'dark';
};

export const Provider: React.FC<PropsWithChildren<Props>> = ({ children, theme }) => {
  return (
    <UseCaseProvider>
      <TamaguiProvider config={config} defaultTheme={theme}>
        {children}
      </TamaguiProvider>
    </UseCaseProvider>
  );
};
