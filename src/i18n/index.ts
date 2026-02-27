import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import tr from './locales/tr.json'
import en from './locales/en.json'

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: savedLang || 'tr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
