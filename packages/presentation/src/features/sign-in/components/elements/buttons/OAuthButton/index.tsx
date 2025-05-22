import React, { ReactNode, useState } from 'react';
import { Button, Paragraph, Spacer, View, XStack, styled } from 'tamagui';
import { AuthProviderType } from '@core/domain';
import { LoadingDialog } from '../../../../../../components/elements/loadings/LoadingDialog';
import { useAuth } from '../../../../../../contexts/AuthContext';

type Props = {
  type: AuthProviderType;
  icon?: ReactNode;
  text: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
};

export const OAuthButton: React.FC<Props> = ({ type, icon, text, backgroundColor, borderColor, textColor }) => {
  const [loadingDialogVisible, setLoadingDialogVisible] = useState(false);
  const { signIn } = useAuth();
  const StaticButton = styled(Button, {
    borderRadius: '$12',
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
  const onPress = async (type: AuthProviderType) => {
    try {
      setLoadingDialogVisible(true);
      await signIn(type);
    } finally {
      setLoadingDialogVisible(false);
    }
  };
  return (
    <>
      <LoadingDialog visible={loadingDialogVisible} />
      <StaticButton borderColor={borderColor} onPress={() => onPress(type)}>
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
