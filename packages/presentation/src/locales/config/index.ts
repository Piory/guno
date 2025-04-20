import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import i18n from 'i18next';
import en from './../en.json';
import ja from './../ja.json';

export const supportedLngs = {
  en: 'English',
  ja: '日本語',
};

i18n.use(initReactI18next).init({
  supportedLngs: Object.keys(supportedLngs),
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: getLocales()[0].languageCode,
  fallbackLng: ['en', 'ja'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
