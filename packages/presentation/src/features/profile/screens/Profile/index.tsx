import React from 'react';
import { Button, H1, Spacer, Text, YStack, styled, useTheme } from 'tamagui';
import { useAuth } from '../../../../contexts';

export const Profile: React.FC = () => {
  const { signOut } = useAuth();
  const { subtle } = useTheme();
  const StaticButton = styled(Button, {
    borderRadius: '$6',
    borderColor: subtle?.get(),
    hoverStyle: {
      borderColor: subtle?.get(),
    },
    pressStyle: {
      borderColor: subtle?.get(),
    },
    focusStyle: {
      borderColor: subtle?.get(),
    },
  });
  return (
    <>
      <YStack alignItems='center' justifyContent='center' height='100%' width='100%'>
        <H1>Profile Screen</H1>
        <Text>Welcome to the Profile Screen!</Text>
        <Spacer size='$6' />
        <StaticButton onPress={signOut}>SignOut</StaticButton>
      </YStack>
    </>
  );
};
