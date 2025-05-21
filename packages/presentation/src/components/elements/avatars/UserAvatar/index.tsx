import React from 'react';
import { GetTokenString, Tokens } from '@tamagui/core';
import { Avatar, getTokenValue } from 'tamagui';
import { ShimmerCircle } from '../../loadings';

type Props = {
  size: GetTokenString<keyof Tokens['size']>;
  avatarUrl: string | undefined;
  isLoading: boolean;
};

export const UserAvatar: React.FC<Props> = ({ size, avatarUrl, isLoading }) => {
  const avatarSize = getTokenValue(size);
  return (
    <>
      <ShimmerCircle width={avatarSize} height={avatarSize} visible={!isLoading}>
        <Avatar circular size={avatarSize}>
          <Avatar.Image src={avatarUrl} />
          <Avatar.Fallback backgroundColor='white' />
        </Avatar>
      </ShimmerCircle>
    </>
  );
};
