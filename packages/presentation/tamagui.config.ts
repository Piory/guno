import { animations, media, selectionStyles, settings, shorthands, tokens } from '@tamagui/config/v4';
import { createInterFont } from '@tamagui/font-inter';
import { createTamagui, createTokens } from 'tamagui';

const customTokens = createTokens({
  size: tokens.size,
  space: tokens.space,
  zIndex: tokens.zIndex,
  radius: tokens.radius,
  color: {
    // —— Brand primaries --------------------------------------------------
    primary: '#A95AFF', // Violet 500
    primary300: '#CBA2FF', // Hover / focus
    primary700: '#8138E4', // Pressed / dark-fg

    cyan: '#47D8DC', // Cyan 500
    cyan300: '#80E7EA', // Hover / focus
    cyan700: '#1AA9AC', // Pressed / dark-fg

    // —— Neutrals ---------------------------------------------------------
    neutral100: '#FFFFFF',
    neutral200: '#F2F4F7',
    neutral700: '#1A1D23',
    neutral900: '#0B0D10',

    // —— Subtle text ------------------------------------------------------
    textSubtleLight: '#6C7380',
    textSubtleDark: '#6C7380',

    // —— Border -----------------------------------------------------------
    borderLight: '#C6CCD6',
    borderDark: '#1C2023',

    // —— Semantic states --------------------------------------------------
    success: '#42E38D',
    warning: '#FFB020',
    danger: '#FF4B6E',

    // —— Gradient shortcut -----------------------------------------------
    brandGradient: 'linear-gradient(130deg,#A95AFF 25%, #91A3FF 50%, #47D8DC 75%)',
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
      primaryHover: customTokens.color.primary300,
      primaryPress: customTokens.color.primary700,
      accent: customTokens.color.cyan,
      // borderColor
      borderColor: customTokens.color.borderLight,
      subtle: customTokens.color.textSubtleLight,
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
      primaryHover: customTokens.color.primary300,
      primaryPress: customTokens.color.primary700,
      accent: customTokens.color.cyan,
      // borderColor
      borderColor: customTokens.color.borderDark,
      subtle: customTokens.color.textSubtleDark,
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
