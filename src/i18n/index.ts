import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from '../assets/translations/en.json';
import ar from '../assets/translations/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode ?? 'en';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: deviceLanguage === 'ar' ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18n;

