import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from '@tamagui/lucide-icons';
import { HomeScreen, ProfileScreen } from '../screens';
import { BottomTabBar } from './BottomTabBar';

const Tab = createBottomTabNavigator<{
  HomeTab: undefined;
  ProfileTab: undefined;
}>();

export const HomeTabs: React.FC = () => {
  return (
    <>
      <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Tab.Screen
          name='HomeTab'
          component={HomeScreen}
          options={{
            title: 'ホーム',
            tabBarIcon: ({ focused, color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name='ProfileTab'
          component={ProfileScreen}
          options={{
            title: 'プロフィール',
            tabBarIcon: ({ focused, color, size }) => <User size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
