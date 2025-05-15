import React from 'react';
import { MessageSquare, MoreHorizontal, Repeat, Share, Star } from '@tamagui/lucide-icons';
import { Avatar, Spacer, Text, XStack, YStack } from 'tamagui';

const iconSize = 16;

export const PostCard: React.FC = () => {
  return (
    <>
      <XStack flex={1} gap='$3' paddingHorizontal='$3' paddingVertical='$2.5'>
        <Avatar circular size='$3' marginTop='$1.5'>
          <Avatar.Image src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80' />
          <Avatar.Fallback backgroundColor='white' />
        </Avatar>
        <YStack flex={1} gap='$1'>
          <XStack gap='$2' flex={1} alignItems='center'>
            <XStack gap='$2' flex={1} alignItems='center'>
              <Text ellipse>
                <Text fontWeight='bold'>Username</Text>
                <Spacer size='$2' />
                <Text color='$subtle' textAlign='center'>
                  @ScreenName
                </Text>
              </Text>
            </XStack>
            <XStack>
              <Text color='$subtle' textAlign='center'>
                1時間前
              </Text>
            </XStack>
            <XStack>
              <YStack justifyContent='space-between' alignItems='flex-end'>
                <MoreHorizontal size={20} color='$subtle' />
              </YStack>
            </XStack>
          </XStack>
          <YStack flex={1} gap='$2'>
            <Text lineHeight={18}>本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本本文本本文本文本文本文本文本文本文本</Text>
            <XStack flex={1} gap='$4' alignItems='center'>
              <XStack flex={3} gap='$1.5' alignItems='center'>
                <MessageSquare size={iconSize} color='$subtle' />
                <Text color='$subtle' fontSize='$3.5'>
                  1000万
                </Text>
              </XStack>
              <XStack flex={3} gap='$1.5' alignItems='center'>
                <Repeat size={iconSize} color='$subtle' />
                <Text fontSize='$3.5' color='$subtle'>
                  1000万
                </Text>
              </XStack>
              <XStack flex={3} gap='$1.5' alignItems='center'>
                <Star size={iconSize} color='$subtle' />
                <Text fontSize='$3.5' color='$subtle'>
                  1000万
                </Text>
              </XStack>
              <XStack flex={1}>
                <YStack flex={1} alignItems='flex-end'>
                  <Share size={iconSize} color='$subtle' />
                </YStack>
              </XStack>
            </XStack>
          </YStack>
        </YStack>
      </XStack>
    </>
  );
};
