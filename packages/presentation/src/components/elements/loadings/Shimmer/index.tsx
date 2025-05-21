import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder, { ShimmerPlaceholderProps } from 'react-native-shimmer-placeholder';
import { useTheme } from 'tamagui';

type Props = {
  style?: Pick<ShimmerPlaceholderProps, 'style'>;
  width?: number | undefined;
  height?: number | undefined;
  visible: boolean | undefined;
} & React.PropsWithChildren<ShimmerPlaceholderProps>;

const Shimmer: React.FC<React.PropsWithChildren<ShimmerPlaceholderProps>> = props => {
  const { shimmerBackground, shimmerHighlight } = useTheme();
  return <ShimmerPlaceHolder LinearGradient={LinearGradient} shimmerColors={[shimmerBackground?.val, shimmerHighlight?.val, shimmerHighlight?.val]} {...props} />;
};

export const ShimmerRectangle: React.FC<Omit<Props, 'style'>> = props => {
  return <Shimmer style={styles.rectangleContainer} {...props} />;
};

export const ShimmerCircle: React.FC<Omit<Props, 'style'>> = props => {
  return <Shimmer style={styles.circleContainer} {...props} />;
};

const styles = StyleSheet.create({
  rectangleContainer: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  circleContainer: {
    borderRadius: 999,
    overflow: 'hidden',
  },
});
