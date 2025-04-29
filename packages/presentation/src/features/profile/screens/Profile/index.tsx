import React from 'react';
import { H1, Text, YStack } from 'tamagui';

export const Profile: React.FC = () => {
  return (
    <>
      <YStack alignItems='center' justifyContent='center' height='100%' width='100%'>
        <H1>Profile Screen</H1>
        <Text>Welcome to the Profile Screen!</Text>
      </YStack>
    </>
  );
};
