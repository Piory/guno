import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, H1, Spacer, Text, YStack, styled, useTheme } from 'tamagui';
import { useAuth } from '../../../../contexts';

export const Profile: React.FC = () => {
  const { t } = useTranslation();
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
  const h1 = 'Profile Screen';
  const text = 'Welcome to the Profile Screen!';
  return (
    <>
      <YStack alignItems='center' justifyContent='center' height='100%' width='100%'>
        <H1>{h1}</H1>
        <Text>{text}</Text>
        <Spacer size='$6' />
        <StaticButton onPress={signOut}>{t('SIGN_OUT')}</StaticButton>
      </YStack>
    </>
  );
};
