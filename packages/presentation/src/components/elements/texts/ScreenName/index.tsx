import React from 'react';
import { Text } from 'tamagui';
import { ShimmerRectangle } from '../../loadings/Shimmer';

type Props = {
  fontSize: string;
  text: string | null | undefined;
};

export const ScreenName: React.FC<Props> = ({ fontSize, text }) => {
  return (
    <>
      <ShimmerRectangle visible={!!text}>
        <Text fontSize={fontSize} color='$subtle'>
          {`@${text}`}
        </Text>
      </ShimmerRectangle>
    </>
  );
};
