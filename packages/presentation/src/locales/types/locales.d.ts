import 'i18next';
import en from '../en.json';
import ja from '../ja.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      ja: typeof ja;
      en: typeof en;
    };
    // other
  }
}
