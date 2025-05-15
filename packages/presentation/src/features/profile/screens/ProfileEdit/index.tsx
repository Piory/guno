import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'solito/router';
import { Avatar, Form, Separator, Spacer, Text, View, YStack, styled } from 'tamagui';
import { Header } from '../../../../components/layouts';

const StyledForm = styled(Form, {
  borderWidth: 1,
  borderRadius: '$8',
  backgroundColor: '$background',
  borderColor: '$borderColor',
  padding: '$3.5',
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
            <YStack gap='$2.5'>
              <View>
                <Text color='$subtle'>{t('USERNAME')}</Text>
                <Spacer size='$1' />
                <Text>@Username</Text>
              </View>
              <Separator />
              <View>
                <Text color='$subtle'>{t('DISPLAY_NAME')}</Text>
                <Spacer size='$1' />
                <Text>DisplayName</Text>
              </View>
              <Separator />
              <View>
                <Text color='$subtle'>{t('SELF_INTRODUCTION')}</Text>
                <Spacer size='$1' />
                <Text>SelfIntroduction</Text>
                <Text>SelfIntroduction</Text>
                <Text>SelfIntroduction</Text>
                <Text>SelfIntroduction</Text>
                <Text>SelfIntroduction</Text>
              </View>
            </YStack>
          </StyledForm>
        </YStack>
      </YStack>
    </>
  );
}
