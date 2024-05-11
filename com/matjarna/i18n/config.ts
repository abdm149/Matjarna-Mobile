import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import English from './translations/english';
import Arabic from './translations/arabic';
import {NativeModules, Platform} from 'react-native';
import {I18nManager} from 'react-native';

const deviceLanguage = NativeModules.I18nManager.localeIdentifier;

const defaultLanguage = deviceLanguage.startsWith('ar') ? 'ar' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: English,
    },
    ar: {
      translation: Arabic,
    },
  },
  //TODO : Handle using default language (Once we add new languages like hebrew and other LTR languages)
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
