import React from 'react';
import { useTranslation } from 'react-i18next';
import X from '../../../../../../../assets/svgs/brands/x.svg';
import { OAuthButton } from '../OAuthButton';

const buttonColor = '#000';
const borderColor = '#000';
const textColor = '#FFF';

export const SignInWithXButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <OAuthButton type='x' backgroundColor={buttonColor} borderColor={borderColor} icon={<X width={18} height={18} />} text={t('CONTINUE_WITH_X')} textColor={textColor} />;
};
