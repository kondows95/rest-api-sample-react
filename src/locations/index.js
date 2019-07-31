import { addLocaleData } from 'react-intl'
import jaLocaleData from 'react-intl/locale-data/ja'
import enLocaleData from 'react-intl/locale-data/en'

import en from './en'
import ja from './ja'

addLocaleData(enLocaleData)
addLocaleData(jaLocaleData)

export const translationMessages = {
  en,
  ja
}

export const chooseLocale = locale => {
  switch (locale) {
    case 'en-GB':
      return translationMessages.en
    case 'ja':
      return translationMessages.ja
    default:
      return translationMessages.en
  }
}