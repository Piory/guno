import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Text, View, YStack, useTheme } from 'tamagui';

export const Loading: React.FC = () => {
  const { shimmerBackground, shimmerHighlight } = useTheme();
  return (
    <>
      <View backgroundColor='$background'>
        <YStack justifyContent='center' alignItems='center'>
          <ShimmerPlaceHolder LinearGradient={LinearGradient} shimmerColors={[shimmerBackground?.val, shimmerHighlight?.val, shimmerHighlight?.val]} visible={true}>
            <Text>AAAA</Text>
          </ShimmerPlaceHolder>
        </YStack>
      </View>
    </>
  );
};
