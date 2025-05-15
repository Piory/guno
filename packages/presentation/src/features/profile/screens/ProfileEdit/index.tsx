import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { Avatar, Button, Form, H4, Input, Spinner, Text, View, YStack, styled } from 'tamagui';
import { Header } from '../../../../components/layouts';

const StyledForm = styled(Form, {
  height: 333,
  borderWidth: 1,
  borderRadius: '$8',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  padding: '$4',
});

export function ProfileEdit() {
  const { back } = useRouter();
  const { t } = useTranslation();
  const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');

  useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <>
      <YStack flex={1} justifyContent='space-between'>
        <Header
          title={t('EDIT_PROFILE')}
          leading={
            <Text fontSize='$5' onPress={back}>
              {t('CANCEL')}
            </Text>
          }
          action={
            <Text fontSize='$5' color='$subtle'>
              {t('SAVE')}
            </Text>
          }
        />
        <YStack flex={1} justifyContent='unset' paddingHorizontal='$4' paddingVertical='$8' gap='$4'>
          <View alignItems='center' justifyContent='center'>
            <Avatar circular size='$10'>
              <Avatar.Image src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80' />
              <Avatar.Fallback backgroundColor='white' />
            </Avatar>
          </View>
          <StyledForm>
            <H4>{status[0].toUpperCase() + status.slice(1)}</H4>
            <Input size='$2' flex={1}></Input>

            <Form.Trigger asChild disabled={status !== 'off'}>
              <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>Submit</Button>
            </Form.Trigger>
          </StyledForm>
        </YStack>
      </YStack>
    </>
  );
}
