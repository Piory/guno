import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertDialog, Button, Paragraph, XStack, styled, useTheme } from 'tamagui';
import { useAuth } from '../../../../../../contexts';

export function SignInWithGuestButton(): React.JSX.Element {
  const { t } = useTranslation();
  const { signIn } = useAuth();
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
  const onPress = () => signIn('anonymous');
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        <StaticButton width='100%'>
          <XStack width='100%' alignItems='center' justifyContent='center'>
            <Paragraph size='$5' fontWeight='bold'>
              {t('CONTINUE_WITH_GUEST')}
            </Paragraph>
          </XStack>
        </StaticButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>{t('GUEST_SIGN_IN_ALERT_TITLE')}</AlertDialog.Title>
          <AlertDialog.Description>{t('GUEST_SIGN_IN_ALERT_MESSAGE')}</AlertDialog.Description>
          <AlertDialog.Cancel asChild>
            <Button>{t('CANCEL')}</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onPress={onPress} asChild>
            <Button onPress={onPress}>{t('CONTINUE')}</Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
