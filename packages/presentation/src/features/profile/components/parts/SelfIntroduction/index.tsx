import React from 'react';
import { Text } from 'tamagui';

type Props = {
  text: string | null | undefined;
};

export const SelfIntroduction: React.FC<Props> = ({ text }) => {
  if (!text) {
    return null;
  }
  return (
    <>
      <Text>{text}</Text>
    </>
  );
};
