/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';

import {
    CHANGE_LOCALE,
} from './constants';
import {
    DEFAULT_LOCALE,
} from '../App/constants';

const initialState = fromJS({
    locale: getDefaultLocale(),
});

const enabledLocales = ['en', 'ko', 'ja', 'zh'];

function getDefaultLocale() {
    let locale = DEFAULT_LOCALE;

    if (navigator && navigator.language) {
        const browserLocale = navigator.language.split('-')[0].toLowerCase();
        _.includes(enabledLocales, browserLocale) && (locale = browserLocale);
    }

    return locale;
}

function languageProviderReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return state.set('locale', action.locale);
        default:
            return state;
    }
}

export default languageProviderReducer;
