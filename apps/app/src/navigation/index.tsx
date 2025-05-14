import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'tamagui';
import { AppConfig } from '@core/shared';
import { Setting, Theme, useAuth } from '@core/presentation';
import { NotFoundScreen, SignInScreen } from '../screens';
import { BottomTabs } from './BottomTabs';

const Stack = createNativeStackNavigator<{
  SignIn: undefined;
  SignedIn: undefined;
  Setting: undefined;
  NotFound: undefined;
}>();

type Props = {
  theme: Theme;
};

export const Navigation: React.FC<Props> = ({ theme }) => {
  const { userId } = useAuth();
  const { background, color, primary } = useTheme();
  const navigationTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: background?.val,
      text: color?.val,
      primary: primary?.val,
      // card: theme.background?.get(),
      border: background?.val,
      // notification: theme.notification?.get(),
    },
  };
  console.log(`userId: ${userId}`);
  return (
    <>
      <NavigationContainer
        onReady={() => BootSplash.hide()}
        theme={navTheme}
        linking={{
          prefixes: [`${AppConfig.APP_ID}://`, AppConfig.WEB_URL],
          config: {
            screens: {
              SignIn: 'sign-in',
              Home: {
                screens: {
                  HomeTab: 'home',
                  ProfileTab: 'profile',
                },
              },
              Setting: 'setting',
              NotFound: '*',
            },
          },
        }}
      >
        <Stack.Navigator
          initialRouteName={userId ? 'SignedIn' : 'SignIn'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Group>{userId ? SignedInStack() : SignInStack()}</Stack.Group>
          <Stack.Screen name='NotFound' component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const SignInStack = () => {
  return (
    <>
      <Stack.Screen name='SignIn' component={SignInScreen} />
    </>
  );
};

const SignedInStack = () => {
  return (
    <>
      <Stack.Screen name='SignedIn' component={BottomTabs} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name='Setting' component={Setting} />
      </Stack.Group>
    </>
  );
};
