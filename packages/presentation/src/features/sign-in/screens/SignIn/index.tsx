import React from 'react';
import { useTranslation } from 'react-i18next';
import { Separator, Spacer, Text, XStack, YStack } from 'tamagui';
import { AppConfig } from '@core/shared';
import Logo from '../../../../../assets/svgs/logo.svg';
import Name from '../../../../../assets/svgs/name.svg';
import { SignInWithAppleButton, SignInWithGoogleButton, SignInWithGuestButton } from '../../components/elements/buttons';

export const SignIn: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <YStack alignItems='center' justifyContent='center' height='100%' width='100%'>
        <YStack paddingBottom='$10' alignItems='center'>
          <Logo width={96} height={96} />
          <Spacer size='$4' />
          <Name width={160} height={40} />
        </YStack>
        <YStack gap='$4' paddingHorizontal='$5' paddingVertical='$2'>
          <SignInWithAppleButton />
          <SignInWithGoogleButton />
          {/*<SignInWithXButton />*/}
          {/*<SignInWithDiscordButton />*/}
          <XStack gap='$4' alignItems='center'>
            <Separator />
            <Text color='$colorMuted'>{t('OR')}</Text>
            <Separator />
          </XStack>
          <SignInWithGuestButton />
          <YStack gap='$2'>
            <Text paddingHorizontal='$2' color='$colorMuted'>
              {t('CONTINUE_WITH_GUEST_WARNING')}
            </Text>
            <Text paddingHorizontal='$2' color='$colorMuted'>
              {t('CONTINUE_IS_APPROVE_TERMS_OF_SERVICE_AND_PRIVACY_POLICY', { appName: AppConfig.APP_DISPLAY_NAME })}
            </Text>
          </YStack>
        </YStack>
      </YStack>
    </>
  );
};
