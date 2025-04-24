import React from 'react';
import { useTranslation } from 'react-i18next';
import Apple from '../../../../../../../assets/svgs/brands/apple.svg';
import { OAuthButton } from '../OAuthButton';

const buttonColor = '#FFF';
const borderColor = '#FFF';
const textColor = '#000';

export const SignInWithAppleButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <OAuthButton type='apple' icon={<Apple color={textColor} width={24} height={24} />} backgroundColor={buttonColor} borderColor={borderColor} text={t('CONTINUE_WITH_APPLE')} textColor={textColor} />
  );
};
