import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from '@tamagui/lucide-icons';
import { BottomTabBar } from '../../layouts/BottomTabBar';
import { HomeScreen, ProfileScreen } from '../../screens';

const BottomTab = createBottomTabNavigator<{
  HomeTab: undefined;
  ProfileTab: undefined;
}>();

export const BottomTabs: React.FC = () => {
  return (
    <>
      <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <BottomTab.Screen
          name='HomeTab'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <BottomTab.Screen
          name='ProfileTab'
          component={ProfileScreen}
          options={{
            title: 'プロフィール',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
