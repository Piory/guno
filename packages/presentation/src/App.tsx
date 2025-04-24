import React from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, View } from 'tamagui';
import '@core/shared';
import config from '../tamagui.config.ts';
import { SignIn } from './features/sign-in/screens/SignIn';
import './locales/config/index.ts';

export const App: React.FunctionComponent = () => {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={config} defaultTheme='dark'>
      <View backgroundColor='$backgroundColor'>
        <SignIn />
      </View>
    </TamaguiProvider>
  );
};
