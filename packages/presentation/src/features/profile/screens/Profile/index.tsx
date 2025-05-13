import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { TabBarProps, Tabs } from 'react-native-collapsible-tab-view';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, XStack, YStack } from 'tamagui';

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const Header = () => {
  return (
    <>
      <View backgroundColor='$background'>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
        <Text style={{ color: 'green' }}>Profile</Text>
      </View>
    </>
  );
};

const TabBar: (props: TabBarProps<string>) => React.ReactElement = ({ index, onTabPress }) => {
  return (
    <>
      <View>
        <XStack flex={1} justifyContent='center' alignItems='center' width='100%' height='100%' backgroundColor='$background'>
          <YStack flex={1} height={44} onTouchEnd={() => onTabPress('A')} justifyContent='center' alignItems='center'>
            <Text fontWeight='bold'>投稿</Text>
          </YStack>
          <YStack flex={1} height={44} onTouchEnd={() => onTabPress('B')} justifyContent='center' alignItems='center'>
            <Text fontWeight='bold'>おきに入り</Text>
          </YStack>
        </XStack>
        <View position='absolute' zIndex={20} height='100%' width='100%'>
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
  const renderItem = useCallback(({ index }) => {
    return <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />;
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
        headerContainerStyle={{ shadowOpacity: 0 }}
        renderHeader={Header}
        renderTabBar={TabBar}
        headerHeight={HEADER_HEIGHT} // optional
        allowHeaderOverscroll
      >
        <Tabs.Tab name='A'>
          <Tabs.FlashList data={DATA} renderItem={renderItem} keyExtractor={identity} />
        </Tabs.Tab>
        <Tabs.Tab name='B'>
          <Tabs.ScrollView>
            <View style={[styles.box, styles.boxA]} />
            <View style={[styles.box, styles.boxB]} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
