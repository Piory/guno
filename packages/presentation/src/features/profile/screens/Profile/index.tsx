import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { TabBarProps, Tabs } from 'react-native-collapsible-tab-view';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, { SharedValue, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'solito/router';
import { Avatar, Separator, Spacer, Text, View, XStack, YStack, useTheme, useWindowDimensions } from 'tamagui';
import { OutlinedButton } from '../../../../components/elements/buttons';
import { PostCard } from '../../../../components/elements/cards';

const DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const identity = (v: unknown): string => v + '';

const Header = () => {
  const { t } = useTranslation();
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
                  <OutlinedButton height='$2.5' paddingHorizontal='$4' paddingVertical='$0' onPress={() => push('/profile/edit')}>
                    <Text>{t('EDIT')}</Text>
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
        </YStack>
      </View>
    </>
  );
};

const AnimatedText = Animated.createAnimatedComponent(Text);

const TabBar: React.FC<TabBarProps<string> & { offset: SharedValue<number> }> = ({ offset, onTabPress }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { color, subtle, primary, secondary, accent } = useTheme();
  const animatedUnderline = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  const animatedPostTabText = useAnimatedStyle(() => ({
    color: interpolateColor(offset.value, [0, width / 2], [color?.val, subtle?.val]) as string,
  }));

  const animatedFavoriteTabText = useAnimatedStyle(() => ({
    color: interpolateColor(offset.value, [0, width / 2], [subtle?.val, color?.val]) as string,
  }));

  return (
    <View width='100%' height={40} backgroundColor='$background' borderBottomColor='$borderColor' borderBottomWidth={1}>
      <XStack flex={1}>
        <YStack flex={1} height={36} onTouchEnd={() => onTabPress('Posts')} justifyContent='center' alignItems='center'>
          <AnimatedText style={[styles.tabBarText, animatedPostTabText]}>{t('POSTS')}</AnimatedText>
        </YStack>
        <YStack flex={1} height={36} onTouchEnd={() => onTabPress('Favorites')} justifyContent='center' alignItems='center'>
          <AnimatedText style={[styles.tabBarText, animatedFavoriteTabText]}>{t('FAVORITES')}</AnimatedText>
        </YStack>
      </XStack>
      <Animated.View style={[styles.tabBarUnderlineContainer, animatedUnderline]}>
        <YStack flex={1} width='100%' justifyContent='flex-end' alignItems='center'>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} locations={[0.25, 0.5, 0.75]} colors={[secondary?.val, primary?.val, accent?.val]} style={styles.tabBarUnderline} />
        </YStack>
      </Animated.View>
    </View>
  );
};

export const Profile: React.FC = () => {
  const { width } = useWindowDimensions();
  const tabUnderlineOffset = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const renderItem = useCallback(({}) => {
    return <PostCard />;
  }, []);

  const onIndexChange = (index: number) => {
    const newOffset = (() => {
      switch (index) {
        case 0:
          return 0;
        case 1:
          return width / 2;
        default:
          return 0;
      }
    })();

    tabUnderlineOffset.value = withSpring(newOffset, {
      damping: 12,
    });
  };

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
        onIndexChange={onIndexChange}
        containerStyle={{ top }}
        headerContainerStyle={styles.headerContainer}
        renderHeader={Header}
        renderTabBar={props => <TabBar offset={tabUnderlineOffset} {...props} />}
        allowHeaderOverscroll
      >
        <Tabs.Tab name='Posts'>
          <Tabs.FlashList data={DATA} renderItem={renderItem} ListFooterComponent={() => <Spacer size='$16' />} ItemSeparatorComponent={() => <Separator />} keyExtractor={identity} />
        </Tabs.Tab>
        <Tabs.Tab name='Favorites'>
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
  tabBarText: {
    fontWeight: 'bold',
  },
  tabBarUnderlineContainer: {
    width: '50%',
    position: 'absolute',
    zIndex: 20,
    bottom: 0,
  },
  tabBarUnderline: {
    width: '50%',
    height: 3,
    borderRadius: 30,
  },
});
