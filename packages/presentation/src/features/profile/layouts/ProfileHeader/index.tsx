import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TabBarProps } from 'react-native-collapsible-tab-view';
import { Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { Spacer, Text, View, XStack, YStack } from 'tamagui';
import { UserAvatar } from '../../../../components/elements/avatars/UserAvatar';
import { OutlinedButton } from '../../../../components/elements/buttons/OutlinedButton';
import { ShimmerRectangle } from '../../../../components/elements/loadings/Shimmer';
import { DisplayName } from '../../../../components/elements/texts/DisplayName';
import { ScreenName } from '../../../../components/elements/texts/ScreenName';
import { useAuth } from '../../../../contexts/AuthContext';
import { useUserStore } from '../../../../stores/userStore';
import { SelfIntroduction } from '../../components/parts/SelfIntroduction';


export const ProfileHeader: React.FC<TabBarProps<string>> = () => {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { userId } = useAuth();
  const entry = useUserStore(state => (userId ? state.userMap[userId] : undefined));
  const fetchUser = useUserStore(state => state.fetchUser);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);
  const isLoading = entry ? entry.isLoading : true;
  const vUserDetail = entry?.isLoading ? undefined : entry?.data?.vUserDetail;
  return (
    <>
      <View backgroundColor='$background' paddingTop='$4' paddingBottom='$2' paddingHorizontal='$4'>
        <YStack flex={1} gap='$3'>
          <YStack>
            <XStack justifyContent='space-between'>
              <UserAvatar size='$6' avatarUrl={vUserDetail?.avatar_url ?? undefined} isLoading={isLoading} />
              <YStack justifyContent='space-between'>
                {isLoading ? undefined : (
                  <XStack gap='$2' alignItems='center'>
                    <OutlinedButton height='$2.5' paddingHorizontal='$4' paddingVertical='$0' onPress={() => push('/profile/edit')}>
                      <Text>{t('EDIT')}</Text>
                    </OutlinedButton>
                    <View onPress={() => push('/setting')}>
                      <View padding='$2'>
                        <Settings color='$color' />
                      </View>
                    </View>
                  </XStack>
                )}
              </YStack>
            </XStack>
          </YStack>
          {(() => {
            if (isLoading) {
              return (
                <YStack flex={1} gap='$2'>
                  <View width='50%'>
                    <ShimmerRectangle visible={false} />
                  </View>
                  <Spacer size='$1' />
                  <ShimmerRectangle visible={false} />
                  <ShimmerRectangle visible={false} />
                  <ShimmerRectangle visible={false} />
                </YStack>
              );
            } else {
              return (
                <YStack flex={1} gap='$3'>
                  <YStack gap='$1'>
                    <DisplayName fontSize='$6' text={entry?.data?.vUserDetail.display_name ?? undefined} />
                    <ScreenName fontSize='$5' text={entry?.data?.vUserDetail.screen_name ?? undefined} />
                  </YStack>
                  <YStack gap='$3'>
                    <SelfIntroduction text={undefined} />
                    <XStack gap='$3'>
                      <XStack gap='$1.5'>
                        <Text fontSize='$3.5' color='$color'>
                          1000万人
                        </Text>
                        <Text fontSize='$3.5' color='$subtle'>
                          {t('FOLLOWS')}
                        </Text>
                      </XStack>
                      <XStack gap='$1.5'>
                        <Text fontSize='$3.5' color='$color'>
                          1000万人
                        </Text>
                        <Text fontSize='$3.5' color='$subtle'>
                          {t('FOLLOWERS')}
                        </Text>
                      </XStack>
                    </XStack>
                  </YStack>
                </YStack>
              );
            }
          })()}
        </YStack>
      </View>
    </>
  );
};
