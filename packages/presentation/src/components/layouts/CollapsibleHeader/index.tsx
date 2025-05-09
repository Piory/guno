import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

export const DEFAULT_HEADER_HEIGHT = 96;

type Props = {
  height?: number;
  translateY?: SharedValue<number>;
} & React.PropsWithChildren;

/**
 * スクロールに応じて折りたたまれるヘッダーコンポーネント
 */
export const CollapsibleHeader: React.FC<Props> = ({ children, height = DEFAULT_HEADER_HEIGHT, translateY }) => {
  const blurType = useColorScheme() === 'dark' ? 'dark' : 'xlight';
  const { top } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY?.value ?? 0 }],
    opacity: translateY ? interpolate(translateY.value, [-(height / 2), 0], [0, 1], Extrapolation.CLAMP) : 1,
  }));

  return (
    <Animated.View style={[styles.header, { height }, animatedStyle]}>
      {/* 1. 背景の Blur/Vibrancy レイヤー */}
      <BlurView style={[styles.background, { paddingTop: top }]} blurType={blurType} blurAmount={4} />

      {/* 2. テキストなどのコンテンツは別レイヤーで重ねる */}
      <View style={[styles.content, { paddingTop: top }]}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    // 必要なら中央寄せなど
    justifyContent: 'center',
    alignItems: 'center',
  },
});
