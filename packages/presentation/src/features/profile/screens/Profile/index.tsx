import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { TabBarProps, Tabs } from 'react-native-collapsible-tab-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { Avatar, Separator, Spacer, Text, View, XStack, YStack } from 'tamagui';
import { OutlinedButton } from '../../../../components/elements/buttons';
import { PostCard } from '../../../../components/elements/cards';

const DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const identity = (v: unknown): string => v + '';

const Header = () => {
  const { push } = useRouter();
  return (
    <>
      <View backgroundColor='$background' paddingTop='$4' paddingBottom='$2' paddingHorizontal='$4'>
        <YStack flex={1} gap='$3'>
          <YStack>
            <XStack justifyContent='space-between'>
              <Avatar circular size='$6'>
                <Avatar.Image src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80' />
                <Avatar.Fallback backgroundColor='white' />
              </Avatar>
              <YStack justifyContent='space-between'>
                <XStack gap='$2' alignItems='center'>
                  <OutlinedButton height='$2.5' paddingHorizontal='$4' paddingVertical='$0'>
                    <Text>編集</Text>
                  </OutlinedButton>
                  <View onPress={() => push('/setting')}>
                    <View padding='$2'>
                      <Settings color='$color' />
                    </View>
                  </View>
                </XStack>
              </YStack>
            </XStack>
          </YStack>
          <YStack flex={1} gap='$3'>
            <YStack gap='$1'>
              <Text fontSize='$6' color='$color' fontWeight='bold'>
                Username
              </Text>
              <Text fontSize='$5' color='$subtle'>
                @ScreenName
              </Text>
            </YStack>
            <YStack gap='$3'>
              <Text color='$color'>
                自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文 自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文
                自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文自己紹介文
              </Text>
              <XStack gap='$3'>
                <XStack gap='$1.5'>
                  <Text fontSize='$3.5' color='$color'>
                    1000万人
                  </Text>
                  <Text fontSize='$3.5' color='$subtle'>
                    フォロー中
                  </Text>
                </XStack>
                <XStack gap='$1.5'>
                  <Text fontSize='$3.5' color='$color'>
                    1000万人
                  </Text>
                  <Text fontSize='$3.5' color='$subtle'>
                    フォロワー
                  </Text>
                </XStack>
              </XStack>
            </YStack>
          </YStack>
        </YStack>
      </View>
    </>
  );
};

const TabBar: (props: TabBarProps<string>) => React.ReactElement = ({ onTabPress }) => {
  return (
    <>
      <View>
        <XStack flex={1} justifyContent='center' alignItems='center' width='100%' height='100%' backgroundColor='$background'>
          <YStack flex={1} height={40} onTouchEnd={() => onTabPress('A')} justifyContent='center' alignItems='center'>
            <Text fontWeight='bold'>投稿</Text>
          </YStack>
          <YStack flex={1} height={40} onTouchEnd={() => onTabPress('B')} justifyContent='center' alignItems='center'>
            <Text fontWeight='bold' color='$subtle'>
              お気に入り
            </Text>
          </YStack>
        </XStack>
        <View position='absolute' zIndex={20} height='100%' width='100%' borderBottomColor='$borderColor' borderBottomWidth={1}>
          <XStack flex={1} alignItems={'flex-end'} width='50%'>
            <YStack flex={1} alignItems='center'>
              <View width='50%' bottom={0} left={0} right={0} height={2} backgroundColor='$primary' />
            </YStack>
          </XStack>
        </View>
      </View>
    </>
  );
};

export const Profile: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const renderItem = useCallback(({}) => {
    return <PostCard />;
  }, []);

  return (
    <>
      <View position='absolute' zIndex={20} height={top} width='100%'>
        <XStack flex={1} alignItems={'flex-end'}>
          <YStack flex={1}>
            <View width='100%' height='100%' backgroundColor='$background' />
          </YStack>
        </XStack>
      </View>
      <Tabs.Container
        containerStyle={{ top }}
        headerContainerStyle={styles.headerContainer}
        renderHeader={Header}
        renderTabBar={TabBar}
        allowHeaderOverscroll
      >
        <Tabs.Tab name='A'>
          <Tabs.FlashList data={DATA} renderItem={renderItem} ListFooterComponent={() => <Spacer size='$16' />} ItemSeparatorComponent={() => <Separator />} keyExtractor={identity} />
        </Tabs.Tab>
        <Tabs.Tab name='B'>
          <Tabs.FlashList data={DATA} renderItem={renderItem} ListFooterComponent={() => <Spacer size='$16' />} ItemSeparatorComponent={() => <Separator />} keyExtractor={identity} />
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    shadowOpacity: 0,
  },
});
