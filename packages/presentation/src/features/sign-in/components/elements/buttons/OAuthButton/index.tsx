import React, { ReactNode } from 'react';
import { Button, Paragraph, Spacer, View, XStack, styled } from 'tamagui';
import { AuthProviderType } from '@core/domain';
import { useAuth } from '../../../../../../contexts';

type Props = {
  type: AuthProviderType;
  icon?: ReactNode;
  text: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

export const OAuthButton: React.FC<Props> = ({ type, icon, text, backgroundColor, borderColor, textColor }) => {
  const { signIn } = useAuth();
  const StaticButton = styled(Button, {
    borderRadius: '$6',
    backgroundColor: backgroundColor,
    borderColor: backgroundColor,
    hoverStyle: {
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
    },
    pressStyle: {
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
    },
    focusStyle: {
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
    },
    borderWidth: '$0.125',
  });
  return (
    <>
      <StaticButton borderColor={borderColor} onPress={() => signIn(type)}>
        <XStack flex={1} width='100%' alignItems='center' justifyContent='center'>
          <View width='24' height='24' justifyContent='center' alignItems='center'>
            {icon ?? null}
          </View>
          <Spacer size='$6' />
          <View>
            <Paragraph color={textColor} size='$5' fontWeight='bold'>
              {text}
            </Paragraph>
          </View>
          <Spacer size='24' />
        </XStack>
      </StaticButton>
    </>
  );
};
