import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'tamagui';
import { AppConfig } from '@core/shared';
import { NotFoundScreen, SignInScreen } from '../screens';
import { HomeTabs } from '../tabs';

const Stack = createNativeStackNavigator<{
  SignIn: undefined;
  Home: undefined;
  NotFound: undefined;
}>();

type Props = {
  theme: 'light' | 'dark';
};

export const Navigation: React.FC<Props> = ({ theme }) => {
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
  return (
    <>
      <NavigationContainer
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
              NotFound: '*',
            },
          },
        }}
      >
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='SignIn' component={SignInScreen} />
          <Stack.Screen name='Home' component={HomeTabs} />
          <Stack.Screen name='NotFound' component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
