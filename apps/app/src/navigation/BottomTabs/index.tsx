import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home as HomeIcon, User } from '@tamagui/lucide-icons';
import { BottomTabBar, Home, Profile } from '@core/presentation';

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
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
          }}
        />
        <BottomTab.Screen
          name='ProfileTab'
          component={Profile}
          options={{
            title: 'プロフィール',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
