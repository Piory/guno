import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertDialog, Button, Text, View, YStack } from 'tamagui';
import { OutlinedButton } from '../../../../components/elements/buttons';
import { LoadingDialog } from '../../../../components/elements/loadings';
import { useAuth } from '../../../../contexts';

export const Setting: React.FC = () => {
  const [loadingDialogVisible, setLoadingDialogVisible] = useState(false);
  const { signOut } = useAuth();
  const { t } = useTranslation();
  const onPress = async () => {
    setLoadingDialogVisible(true);
    await signOut();
    setLoadingDialogVisible(false);
  };
  return (
    <>
      <LoadingDialog visible={loadingDialogVisible} />
      <View flex={1} backgroundColor='$background'>
        <YStack flex={1} alignItems='center' justifyContent='center'>
          <AlertDialog native>
            <AlertDialog.Trigger asChild>
              <OutlinedButton>
                <Text fontSize='$4'>{t('SIGN_OUT')}</Text>
              </OutlinedButton>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay />
              <AlertDialog.Content>
                <AlertDialog.Title>{t('SIGN_OUT_MESSAGE')}</AlertDialog.Title>
                <AlertDialog.Cancel asChild>
                  <Button>{t('CANCEL')}</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action onPress={onPress} asChild>
                  <Button>{t('SIGN_OUT')}</Button>
                </AlertDialog.Action>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog>
        </YStack>
      </View>
    </>
  );
};
