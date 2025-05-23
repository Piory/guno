import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { H4, Input, Text, YStack } from 'tamagui';
import { FillButton } from '../../../../../components/elements/buttons/FillButton';
import { BottomModalSheet } from '../../../../../components/modals/BottomModalSheet';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenName: string | null | undefined;
};

export const EditScreenNameModal: React.FC<Props> = ({ open, onOpenChange, screenName }) => {
  const { t } = useTranslation();
  const inputRef = useRef<Input>(null);
  return (
    <>
      <BottomModalSheet
        open={open}
        onOpenChange={b => {
          onOpenChange(b);
        }}
        snapPoints={[35, 10]}
      >
        <YStack width='100%' flex={1} gap='$4' justifyContent='space-between' alignItems='center'>
          <H4 flex={1} justifyContent='center' alignItems='center' fontWeight='bold'>
            {t('USERNAME')}
          </H4>
          <Input ref={inputRef} width='100%' defaultValue={screenName ?? undefined} placeholder={t('USERNAME')} />
          <FillButton width='100%'>
            <Text>{t('DONE')}</Text>
          </FillButton>
        </YStack>
      </BottomModalSheet>
    </>
  );
};
