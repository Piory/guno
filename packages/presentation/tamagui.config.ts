import { animations, media, selectionStyles, settings, shorthands, themes, tokens } from '@tamagui/config/v4';
import { createInterFont } from '@tamagui/font-inter';
import { createTamagui, createTokens } from 'tamagui';

const customTokens = createTokens({
  size: tokens.size,
  space: tokens.space,
  zIndex: tokens.zIndex,
  radius: tokens.radius,
  color: {
    backgroundColor: '#060606',
    colorMuted: '#666',
    primaryColor: '#00F47F',
    primaryShadeColor: '#00C7B1',
    accentColor: '#A6FF00',
    secondaryColor: '#F40075',
    errorColor: '#FF1867',
  },
});
const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
  animations,
  media,
  shorthands,
  themes,
  // themes: {
  //   dark: {
  //     fontColor: '#fff',
  //     background: '#060606',
  //     primaryColor: customTokens.color.primaryColor,
  //     secondaryColor: customTokens.color.secondaryColor,
  //   },
  //   light: {
  //     fontColor: '#121212',
  //     background: '#fff',
  //     primaryColor: customTokens.color.primaryColor,
  //     secondaryColor: customTokens.color.secondaryColor,
  //   },
  // },
  tokens: customTokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  selectionStyles,
  settings,
});

export default config;
