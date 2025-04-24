import React from 'react';
import { useTranslation } from 'react-i18next';
import Google from '../../../../../../../assets/svgs/brands/google.svg';
import { OAuthButton } from '../OAuthButton';

const buttonColor = '#FFFFFF';
const borderColor = '#FFFFFF';
const textColor = '#1F1F1F';

export const SignInWithGoogleButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <OAuthButton type='google' backgroundColor={buttonColor} borderColor={borderColor} icon={<Google width={24} height={24} />} text={t('CONTINUE_WITH_GOOGLE')} textColor={textColor} />;
};
