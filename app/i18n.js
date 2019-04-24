/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';
import ruLocaleData from 'react-intl/locale-data/ru';
import koLocaleData from 'react-intl/locale-data/ko';
import jaLocaleData from 'react-intl/locale-data/ja';
import zhLocaleData from 'react-intl/locale-data/zh';

import { DEFAULT_LOCALE } from './core/containers/App/constants';

import enTranslationMessages from './translations/en.json';
import deTranslationMessages from './translations/de.json';
import ruTranslationMessages from './translations/ru.json';
import koTranslationMessages from './translations/ko.json';
import jaTranslationMessages from './translations/ja.json';
import zhTranslationMessages from './translations/zh.json';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);
addLocaleData(ruLocaleData);
addLocaleData(koLocaleData);
addLocaleData(jaLocaleData);
addLocaleData(zhLocaleData);

export const appLocales = ['en', 'de', 'ru', 'ko', 'ja', 'zh'];

export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE
        ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
        : {};
    return Object.keys(messages).reduce((formattedMessages, key) => {
        const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
            ? defaultFormattedMessages[key]
            : messages[key];
        return Object.assign(formattedMessages, { [key]: formattedMessage });
    }, {});
};

export const translationMessages = {
    en: formatTranslationMessages('en', enTranslationMessages),
    de: formatTranslationMessages('de', deTranslationMessages),
    ru: formatTranslationMessages('ru', ruTranslationMessages),
    ko: formatTranslationMessages('ko', koTranslationMessages),
    ja: formatTranslationMessages('ja', jaTranslationMessages),
    zh: formatTranslationMessages('zh', zhTranslationMessages),
};
