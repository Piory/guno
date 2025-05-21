import React from 'react';
import { Text } from 'tamagui';
import { ShimmerRectangle } from '../../loadings';

type Props = {
  fontSize: string;
  text: string | undefined;
};

export const DisplayName: React.FC<Props> = ({ fontSize, text }) => {
  return (
    <>
      <ShimmerRectangle visible={!!text}>
        <Text fontSize={fontSize} fontWeight='bold'>
          {text}
        </Text>
      </ShimmerRectangle>
    </>
  );
};
