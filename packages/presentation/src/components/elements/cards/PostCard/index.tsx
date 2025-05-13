import React from 'react';
import { MessageSquare, MoreHorizontal, Repeat, Star } from '@tamagui/lucide-icons';
import { Avatar, Text, XStack, YStack } from 'tamagui';

export const PostCard: React.FC = () => {
  return (
    <>
      <XStack flex={1} gap='$3' paddingHorizontal='$3' paddingTop='$2' paddingBottom='$3'>
        <YStack paddingTop='$1.5'>
          <Avatar circular size='$3'>
            <Avatar.Image src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80' />
            <Avatar.Fallback backgroundColor='white' />
          </Avatar>
        </YStack>
        <YStack flex={1} gap='$1.5'>
          <YStack>
            <XStack>
              <XStack gap='$2' flex={1} alignItems='center'>
                <Text fontSize='$4' fontWeight='bold'>
                  Username
                </Text>
                <Text fontSize='$2' color='$subtle' textAlign='center'>
                  @ScreenName
                </Text>
                <Text fontSize='$2' color='$subtle' textAlign='center'>
                  1時間前
                </Text>
                <YStack flex={1} justifyContent='space-between' alignItems='flex-end'>
                  <MoreHorizontal size='$1' color='$subtle' />
                </YStack>
              </XStack>
            </XStack>
          </YStack>
          <YStack flex={1}>
            <Text>本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本</Text>
          </YStack>
          <YStack flex={1} gap='$2' paddingTop='$2'>
            <XStack gap='$6' flex={1} alignItems='center'>
              <XStack gap='$2' alignItems='center'>
                <MessageSquare size={16} color='$subtle' />
                <Text fontSize='$4' color='$subtle'>
                  0
                </Text>
              </XStack>
              <XStack gap='$2' alignItems='center'>
                <Repeat size={16} color='$subtle' />
                <Text fontSize='$4' color='$subtle'>
                  0
                </Text>
              </XStack>
              <XStack gap='$2' alignItems='center'>
                <Star size={16} color='$subtle' />
                <Text fontSize='$4' color='$subtle'>
                  0
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>
      </XStack>
    </>
  );
};
