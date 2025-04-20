import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';
import { Avatar, Button, Image, Text, YStack } from 'tamagui';
import { DIContainer } from '@core/shared';
import { SignInUseCase } from '@core/usecase';

export function Title(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <SafeAreaView>
      <View>
        <YStack alignItems='center'>
          <Image height={140} width={140} source={require('./../../../../../../../apps/app/assets/icons/app_icon.png')} />
          <Text>Ascelta</Text>
        </YStack>
        <YStack alignItems='center' gap='$6'>
          <Avatar circular size='$10'>
            <Avatar.Image accessibilityLabel='Cam' src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80' />
            <Avatar.Fallback backgroundColor='$blue10' />
          </Avatar>

          <Avatar circular size='$8'>
            <Avatar.Image accessibilityLabel='Nate Wienert' src='https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80' />
            <Avatar.Fallback delayMs={600} backgroundColor='$blue10' />
          </Avatar>
          <Button onPress={() => DIContainer.resolve(SignInUseCase).execute('google')}>{t('CONTINUE_WITH_GOOGLE')}</Button>
          <Button onPress={() => DIContainer.resolve(SignInUseCase).execute('discord')}>{t('CONTINUE_WITH_DISCORD')}</Button>
        </YStack>
      </View>
    </SafeAreaView>
  );
}
