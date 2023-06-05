import en, { Translations } from './en';
import ko from './ko';
import my from './my';

import _get from 'lodash/get';

export type I18n = {
  translations: {
    [K: string]: Translations
  }
  local: string, // keyof I18n["translations"],
  t: (key: TxPath) => string
}

export const i18n: I18n = {
  translations: { en, ko, my },
  local: "en",
  t(key) {
    const localPrefix = this.translations[this.local as keyof I18n["translations"]];
    return _get(localPrefix, key)
  }
}


type RecusiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? `${Text}.${RecusiveKeyOf<TValue>}`
    : Text

type RecusiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string)]: RecusiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & string]

export type TxPath = RecusiveKeyOf<Translations>;
