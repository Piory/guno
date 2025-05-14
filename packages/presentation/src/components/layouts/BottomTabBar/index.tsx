import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { XStack, YStack } from 'tamagui';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { bottom } = useSafeAreaInsets();
  const blurType = useColorScheme() === 'dark' ? 'dark' : 'xlight';
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const RADIUS = 35;

  return (
    <View style={[styles.container, { bottom }]}>
      <BlurView
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: RADIUS,
            overflow: 'hidden',
          },
        ]}
        blurType={blurType}
        blurAmount={4}
        reducedTransparencyFallbackColor={colors.background}
      />

      <XStack width='100%' justifyContent='space-between' alignItems='center'>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <YStack key={route.key} flex={1}>
              <PlatformPressable
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabBarItem}
              >
                {options.tabBarIcon!({
                  focused: isFocused,
                  color: isFocused ? colors.primary : colors.text,
                  size: 24,
                })}
              </PlatformPressable>
            </YStack>
          );
        })}
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginHorizontal: 96,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
