import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

import {en, fr} from './resources'

export const locales = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
}

export const DEFAULT_LOCALE = 'en'

export const defaultLanguage =
  RNLocalize.findBestLanguageTag(Object.keys(locales))?.languageTag ||
  DEFAULT_LOCALE

i18n.use(initReactI18next).init({
  fallbackLng: defaultLanguage,
  resources: locales,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
