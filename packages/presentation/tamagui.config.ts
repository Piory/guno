import { animations, media, selectionStyles, settings, shorthands, tokens } from '@tamagui/config/v4';
import { createInterFont } from '@tamagui/font-inter';
import { createTamagui, createTokens } from 'tamagui';

const customTokens = createTokens({
  size: tokens.size,
  space: tokens.space,
  zIndex: tokens.zIndex,
  radius: tokens.radius,
  color: {
    // Primary
    primary: '#91A3FF',
    primary300: '#B9C4FF',
    primary700: '#6475D1',

    // Secondary (violet)
    secondary: '#A95AFF',
    secondary300: '#CBA2FF',
    secondary700: '#8138E4',

    // Accent (cyan)
    accent: '#47D8DC',
    accent300: '#80E7EA',
    accent700: '#1AA9AC',

    // Neutrals
    neutral100: '#FFFFFF',
    neutral200: '#F2F4F7',
    neutral700: '#1A1D23',
    neutral900: '#0B0D10',

    // Border & subtle
    borderLight: '#E2E9F4',
    borderDark: '#1C2023',
    textSubtleLight: '#A0A9BC',
    textSubtleDark: '#6C7380',

    // Semantic
    success: '#42E38D',
    warning: '#FFB020',
    danger: '#FF4B6E',

    // Brand gradient
    brandGradient: 'linear-gradient(130deg,#A95AFF 0%,#91A3FF 50%,#47D8DC 100%)',
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

const config = createTamagui({
  animations,
  media,
  shorthands,
  // themes,
  themes: {
    light: {
      background: customTokens.color.neutral100,
      tabBarBackground: customTokens.color.neutral200,
      color: customTokens.color.neutral900,
      // brand accents
      primary: customTokens.color.primary,
      primary300: customTokens.color.primary300,
      primary700: customTokens.color.primary700,
      secondary: customTokens.color.secondary,
      secondary300: customTokens.color.secondary300,
      secondary700: customTokens.color.secondary700,
      accent: customTokens.color.accent,
      accent300: customTokens.color.accent300,
      accent700: customTokens.color.accent700,
      // borderColor
      borderColor: customTokens.color.borderLight,
      subtle: customTokens.color.textSubtleLight,
      // shimmer
      shimmerBackground: '#F7F7F7',
      shimmerHighlight: '#E0E0E0',
      // semantic
      success: customTokens.color.success,
      warning: customTokens.color.warning,
      danger: customTokens.color.danger,
    },
    dark: {
      background: customTokens.color.neutral900,
      tabBarBackground: customTokens.color.neutral700,
      color: customTokens.color.neutral100,
      // brand accents
      primary: customTokens.color.primary,
      primary300: customTokens.color.primary300,
      primary700: customTokens.color.primary700,
      secondary: customTokens.color.secondary,
      secondary300: customTokens.color.secondary300,
      secondary700: customTokens.color.secondary700,
      accent: customTokens.color.accent,
      accent300: customTokens.color.accent300,
      accent700: customTokens.color.accent700,
      // borderColor
      borderColor: customTokens.color.borderDark,
      subtle: customTokens.color.textSubtleDark,
      // shimmer
      shimmerBackground: '#14161A',
      shimmerHighlight: '#22252C',
      // semantic
      success: customTokens.color.success,
      warning: customTokens.color.warning,
      danger: customTokens.color.danger,
    },
    // dark: {
    //   ...themes.dark,
    //   background: customTokens.color.backgroundColor,
    //   backgroundHover: customTokens.color.backgroundColor,
    //   backgroundFocus: customTokens.color.backgroundColor,
    //   backgroundPress: customTokens.color.backgroundColor,
    //   backgroundStrong: customTokens.color.backgroundColor,
    //   color: '#fff',
    //   colorHover: '#fff',
    //   colorFocus: '#fff',
    //   colorPress: '#fff',
    //   borderColor: customTokens.color.borderColor,
    //   borderColorHover: customTokens.color.borderColor,
    //   borderColorFocus: customTokens.color.borderColor,
    //   borderColorPress: customTokens.color.borderColor,
    //   primary: customTokens.color.primaryColor,
    //   secondary: customTokens.color.secondaryColor,
    // },
    // light: {
    //   ...themes.light,
    //   color: '#121212',
    //   background: '#fff',
    //   primary: customTokens.color.primaryColor,
    //   secondary: customTokens.color.secondaryColor,
    // },
  },
  tokens: customTokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  selectionStyles,
  settings,
});

export default config;
