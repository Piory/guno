import React from 'react';
import { useColorScheme } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from '@core/presentation';
import { Navigation } from './navigation';

export const App: React.FC = () => {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return (
    <>
      <SafeAreaProvider>
        <Provider theme={theme}>
          <Navigation theme={theme} onReady={BootSplash.hide} />
        </Provider>
      </SafeAreaProvider>
    </>
  );
};
