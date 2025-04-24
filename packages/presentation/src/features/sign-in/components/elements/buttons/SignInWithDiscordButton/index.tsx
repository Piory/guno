import React from 'react';
import { useTranslation } from 'react-i18next';
import Discord from '../../../../../../../assets/svgs/brands/discord.svg';
import { OAuthButton } from '../OAuthButton';

const backgroundColor = '#5865F2';
const borderColor = '#5865F2';
const textColor = '#FFF';

export const SignInWithDiscordButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <OAuthButton
      type='discord'
      icon={<Discord color={textColor} width={24} height={24} />}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      text={t('CONTINUE_WITH_DISCORD')}
      textColor={textColor}
    />
  );
};
