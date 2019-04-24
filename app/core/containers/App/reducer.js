/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import ReactGA from 'react-ga';

import {
    UNAUTH_USER,
    AUTH_ERROR
} from 'core/containers/MainPage/constants';

import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
    GA_CODE_SEND_SUCCESS,
    SOCIAL_GOOGLE_SIGNIN_SUCCESS,
    SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
} from 'core/containers/SigninPage/constants';

import {
    SIGNUP_USER_SUCCESS,
    CONFIRM_CODE_SEND,
    CONFIRM_CODE_SEND_SUCCESS,
    CONFIRM_CODE_SEND_ERROR,

    SOCIAL_GOOGLE_SIGNUP_SUCCESS,
    SOCIAL_FACEBOOK_SIGNUP_SUCCESS,
} from 'core/containers/SignupPage/constants';

import {
    SUBMIT_SUCCESS_ACTION as SUBMIT_CONFIRM_SUCCESS_ACTION
} from 'core/containers/EmailConfirmPage/constants';

import {
    GA_CONFIRM_TOKEN_SEND_SUCCESS
} from 'core/containers/GaConfirmPage/constants';

import {
    SUBMIT_SUCCESS_ACTION as SUBMIT_ENABLE_GOOGLE_SUCCESS_ACTION,
    SUBMIT_DISABLE_GOOGLE_SUCCESS_ACTION,
} from 'core/containers/SecurityPage/constants';

import {
    SEND_ACCOUNT_CHANGE_SUCCESS,
} from 'core/containers/AccountPage/constants';

import {
    SAVE_SUCCESS_ACTION as SAVE_VERIFICATION_DATA_SUCCESS_ACTION,
} from 'core/containers/VerificationDataPage/constants';

import {
    CHECK_SUCCESS_ACTION as CHECK_VERIFICATION_SUCCESS_ACTION,
    CANCEL_SUCCESS_ACTION as CANCEL_VERIFICATION_SUCCESS_ACTION,
    POR_SUCCESS_ACTION as POR_SUCCESS_ACTION
} from 'core/containers/VerificationPage/constants';

import {
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS,
    LOAD_REPOS_ERROR,
    LOAD_WALLETS_SUCCESS,
    LOAD_WALLETS_ERROR,
    CHANGE_WALLETS,

    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,

    LOAD_USER_SUCCESS,
    AJAX_ERROR,
    RESET_DEFAULTS,
    HARD_RESET_DEFAULTS,

    NOTIFICATION_SHOW,
    NOTIFICATION_HIDE,

    HOT_GET,
    HOT_GET_SUCCESS,
    HOT_GET_ERROR,

    TOTAL_RECEIVE_GET,
    TOTAL_RECEIVE_GET_SUCCESS,
    TOTAL_RECEIVE_GET_ERROR,

    SET_CONSENT,

    CHECK_CONSENT,
    CHECK_CONSENT_SUCCESS,
    CHECK_CONSENT_ERROR,
    CHECK_CONSENT_RESET,
    CHECK_CONSENT_RESET_SCOPES,

    OPEN_CONTACT_US,
    CLOSE_CONTACT_US,
    CONTACT_US_ERRORS_SHOWN,
    SEND_CONTACT_US,
    SEND_CONTACT_US_SUCCESS,
    SEND_CONTACT_US_ERROR,

    CLEAN_USER,
} from './constants';

import config from 'core/utils/config';

// The initial state of the App
const initialState = fromJS({
    persistExpiresAt: '',

    subLoading: false,
    hotLoading: false,

    loading: false,
    error: false,
    currentUser: false,
    notifications: [],
    userData: {
        authenticated: false,
        need_ga_validate: false,
        UseGa: false,
        Email: '',
        IsVerified: false,

        FirstName: '',
        MiddleName: '',
        LastName: '',
        Lang: '',
        Country: '',
        Address: '',
        DocumentNumber: '',
        EthWallet: '',

        info: {},
        wallet: {
            alias: ''
        },
        tokens: {},
    },
    hotWallets: [
    ],
    totalReceived: [
    ],
    subWallets: {
        list: [
            {
                Name: 'Bitcoin',
                Symbol: 'btc',
                SubwalletCount: '12', // количество сабкошельков по битку
                Remains: '0.145323', // остатки по сабошелькам
                Received: '123.534' // всего поступлений по саб-кошелькам
            },
            {
                Name: 'Ethereum',
                Symbol: 'eth',
                SubwalletCount: '5', // количество сабкошельков по битку
                Remains: '445.145323', // остатки по сабошелькам
                Received: '7.534' // всего поступлений по саб-кошелькам
            },
            {
                Name: 'Litecoin',
                Symbol: 'ltc',
                SubwalletCount: '1', // количество сабкошельков по битку
                Remains: '134.145323', // остатки по сабошелькам
                Received: '6.534' // всего поступлений по саб-кошелькам
            },
        ],
    },
    loadings: {
        signout: false
    },
    consent: '',
    consentScopes: [],
    contactUs: {
        isLoading: false,
        isOpened: false,
        formErrors: [],
    },

    isConsentInfoGet: false,
    consentInfo: {
        requestedScopes: []
    },
});

function getVerificationStatus(userData) {
    switch (userData.KycStatus) {
        case 'approved':
            return 'verified';
        case 'in_work':
        case 'sent':
            return 'in_progress';
        default:
            return 'unverified';
    }
}

function getTier(userData) {
    if ((userData.VerificationStatus === 'verified') && (userData.PorStatus !== 'approved')) {
        return 1;
    } else if ((userData.VerificationStatus === 'verified') && (userData.PorStatus === 'approved')) {
        return 2;
    } else {
        return 0;
    }
}

function appReducer(state = initialState, action) {
    const notifications = state.get('notifications');
    const userTokens = state.getIn(['userData', 'tokens']);

    switch (action.type) {
        case LOAD_REPOS:
            return state
                .set('loading', true)
                .set('error', false)
                .setIn([
                    'userData', 'repositories'
                ], false);
        case LOAD_REPOS_SUCCESS:
            return state
                .setIn([
                    'userData', 'repositories'
                ], action.repos).set('loading', false).set('currentUser', action.username);
        case LOAD_REPOS_ERROR:
            return state.set('error', action.error).set('loading', false);

        // case AUTH_USER:
        //     return state
        //         .setIn([
        //             'userData', 'authenticated'
        //         ], action.auth);
        case AUTH_USER_SUCCESS:
            const userDataAll = _.extend({}, action.authData.Client, action.authData.Session);
            const isNeedGa = userDataAll.UseG2fa;
            userDataAll.VerificationStatus = getVerificationStatus(userDataAll);
            userDataAll.VerificationTier = getTier(userDataAll);

            _debug('AUTH_USER_SUCCESS: ', action.authData);
            _debug('Authenticated: ', isNeedGa);

            if (userDataAll.Email !== state.get('userData').get('Email')) {
                _debug('need cleaning', userDataAll.Email, state.get('userData').get('Email'));
            } else {
                _debug('no need cleaning: ', userDataAll.Email, state.get('userData').get('Email'));
            }

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataAll)
                .setIn([
                    'userData', 'need_ga_validate'
                ], isNeedGa)
                .setIn([
                    'userData', 'authenticated'
                ], !isNeedGa);

        case SOCIAL_GOOGLE_SIGNUP_SUCCESS:
            _debug('SOCIAL_GOOGLE_SIGNUP_SUCCESS: ', action.data);

            const userDataAllGoogleSignup = _.extend({}, action.data.Client, action.data.Session);
            const isNeedGaGoogleSignup = userDataAllGoogleSignup.UseG2fa;

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataAllGoogleSignup)
                .setIn([
                    'userData', 'need_ga_validate'
                ], isNeedGaGoogleSignup)
                .setIn([
                    'userData', 'authenticated'
                ], !isNeedGaGoogleSignup);
        case SOCIAL_FACEBOOK_SIGNUP_SUCCESS:
            _debug('SOCIAL_FACEBOOK_SIGNUP_SUCCESS: ', action.data);

            const userDataAllFacebookSignup = _.extend({}, action.data.Client, action.data.Session);
            const isNeedGaFacebookSignup = userDataAllFacebookSignup.UseG2fa;
            userDataAllFacebookSignup.VerificationStatus = getVerificationStatus(userDataAllFacebookSignup);
            userDataAllFacebookSignup.VerificationTier = getTier(userDataAllFacebookSignup);

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataAllFacebookSignup)
                .setIn([
                    'userData', 'need_ga_validate'
                ], isNeedGaFacebookSignup)
                .setIn([
                    'userData', 'authenticated'
                ], !isNeedGaFacebookSignup);
        case SOCIAL_GOOGLE_SIGNIN_SUCCESS:
            _debug('SOCIAL_GOOGLE_SIGNIN_SUCCESS: ', action.data);

            const userDataAllGoogle = _.extend({}, action.data.Client, action.data.Session);
            const isNeedGaGoogle = userDataAllGoogle.UseG2fa;
            userDataAllGoogle.VerificationStatus = getVerificationStatus(userDataAllGoogle);
            userDataAllGoogle.VerificationTier = getTier(userDataAllGoogle);

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataAllGoogle)
                .setIn([
                    'userData', 'need_ga_validate'
                ], isNeedGaGoogle)
                .setIn([
                    'userData', 'authenticated'
                ], !isNeedGaGoogle);
        case SOCIAL_FACEBOOK_SIGNIN_SUCCESS:
            _debug('SOCIAL_FACEBOOK_SIGNIN_SUCCESS: ', action.data);

            const userDataAllFacebook = _.extend({}, action.data.Client, action.data.Session);
            const isNeedGaFacebook = userDataAllFacebook.UseG2fa;
            userDataAllFacebook.VerificationStatus = getVerificationStatus(userDataAllFacebook);
            userDataAllFacebook.VerificationTier = getTier(userDataAllFacebook);

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataAllFacebook)
                .setIn([
                    'userData', 'need_ga_validate'
                ], isNeedGaFacebook)
                .setIn([
                    'userData', 'authenticated'
                ], !isNeedGaFacebook);

        case GA_CODE_SEND_SUCCESS:
            return state
                .setIn([
                    'userData', 'need_ga_validate'
                ], false)
                .setIn([
                    'userData', 'authenticated'
                ], true);

        // case SIGNUP_USER_SUCCESS:
        //     _debug('SIGNUP_USER_SUCCESS: ', action);

        //     return state
        //     // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
        //         .mergeDeepIn(['userData'], action.authData.user).setIn([
        //             'userData', 'authenticated'
        //         ], true);

        case SIGNOUT:
            return state.setIn([
                'loadings', 'signout'
            ], action.loading);
        case SIGNOUT_SUCCESS:
            return state.setIn([
                'loadings', 'signout'
            ], action.loading).set('userData', initialState.get('userData')); // Очищаем все данные о пользователе после разлогина
        case SIGNOUT_ERROR:
            return state.setIn([
                'loadings', 'signout'
            ], action.loading);

        case LOAD_USER_SUCCESS:
            const clientDataUpdated = _.extend({}, action.data.Client, action.data.Session);
            const isAuthenticated = state.get('userData').get('authenticated') || !clientDataUpdated.UseGa || clientDataUpdated.GaAccepted;
            clientDataUpdated.VerificationStatus = getVerificationStatus(clientDataUpdated);
            clientDataUpdated.VerificationTier = getTier(clientDataUpdated);

            return state
                .mergeDeepIn(['userData'], clientDataUpdated)
                .setIn([
                    'userData', 'authenticated'
                ], isAuthenticated);
            // return state.mergeDeepIn(['userData'], action.data.user).mergeDeepIn([
            //     'userData', 'info'
            // ], action.data.attributes);

        // case CONFIRM_TOKEN_SEND_SUCCESS:
        //     return state.mergeDeepIn(['userData'], action.data.user);

        case SEND_ACCOUNT_CHANGE_SUCCESS:
            return state
                .mergeDeepIn(['userData'], action.data);

        case LOAD_WALLETS_SUCCESS:
            _debug('reducer LOAD_WALLETS_SUCCESS: ', action.data.wallet, action.data.tokens);
            return state
                .mergeDeepIn([
                    'userData', 'tokens'
                ], action.data.tokens)
                .mergeDeepIn([
                    'userData', 'wallet'
                ], action.data.wallet);

        case CONFIRM_CODE_SEND_SUCCESS:
            _debug('CONFIRM_CODE_SEND_SUCCESS: ', action.data);

            const userDataConfirmCode = _.extend({}, action.data.Client, action.data.Session);
            userDataConfirmCode.VerificationStatus = getVerificationStatus(userDataConfirmCode);
            userDataConfirmCode.VerificationTier = getTier(userDataConfirmCode);

            ReactGA.event({
                category: 'Signup',
                action: 'Email',
                label: 'Success',
                value: 1
            });

            return state
            // .set('persistExpiresAt', '2017-07-21T17:02:00Z') // TODO: настроить ттл с ответа сервера
                .mergeDeepIn(['userData'], userDataConfirmCode)
                .setIn([
                    'userData', 'authenticated'
                ], true);

        case SUBMIT_CONFIRM_SUCCESS_ACTION:
            _debug('SUBMIT_CONFIRM_SUCCESS_ACTION: ', action.data);

            const userDataSubmitCode = _.extend({}, action.data.Client, action.data.Session);
            userDataSubmitCode.VerificationStatus = getVerificationStatus(userDataSubmitCode);
            userDataSubmitCode.VerificationTier = getTier(userDataSubmitCode);

            ReactGA.event({
                category: 'Signup',
                action: 'Email',
                label: 'Success',
                value: 1
            });

            return state
                .mergeDeepIn(['userData'], userDataSubmitCode)
                .setIn([
                    'userData', 'authenticated'
                ], true);

        case GA_CONFIRM_TOKEN_SEND_SUCCESS:
            return state.mergeDeepIn(['userData'], action.data.user);

        // case AJAX_ERROR:
        //     _debug('reducer AJAX_ERROR: ', action);

        //     if (action.errors && action.errors[0].Key === 'Token') {
        //         return state.set('userData', initialState.get('userData'));
        //     } else {
        //         return state;
        //     }

        case CLEAN_USER:
            return state
                .set('userData', initialState.get('userData'));
        case RESET_DEFAULTS:
            const userData = (config.lastPurge === state.get('lastPurge')) ? state.get('userData') : initialState.get('userData');
            const newNotifications = (config.lastPurge === state.get('lastPurge')) ? state.get('notifications') : initialState.get('notifications');
            const newConsentData = (config.lastPurge === state.get('lastPurge')) ? state.get('consentInfo') : initialState.get('consentInfo');

            return state
                .set('userData', userData)
                .set('lastPurge', config.lastPurge)
                .setIn(['userData', 'need_ga_validate'], false)
                .set('contactUs', initialState.get('contactUs'))
                .setIn(['userData', 'tokens'], fromJS({}))
                .set('consentInfo', newConsentData)
                .setIn('notifications', newNotifications);

        case HARD_RESET_DEFAULTS:
            return state
                .set('userData', initialState.get('userData'))
                .setIn(['userData', 'need_ga_validate'], false)
                .set('contactUs', initialState.get('contactUs'))
                .setIn(['userData', 'tokens'], fromJS({}))
                .set('consentInfo', initialState.get('consentInfo'))
                .setIn('notifications', initialState.get('notifications'));

        case CHANGE_WALLETS:
            _debug('here change wallet reducer: ', action.data);
            return state.mergeDeepIn([
                'userData', 'wallet'
            ], action.data);

            // Notifications
        case NOTIFICATION_SHOW:
            _debug('NOTIFICATION_SHOW: ', action.notification);

            const clone = notifications.find((item) => {
                return item.get('message').id === action.notification.get('message').id;
            });

            if (action.notification.get('unique') && clone) {
                return state;
            } else {
                return state.set('notifications', notifications.push(action.notification));
            }
        case NOTIFICATION_HIDE:
            return state.set('notifications', notifications.filter((item) => {
                return item.get('id') !== action.notification.id;
            }));

        case SUBMIT_ENABLE_GOOGLE_SUCCESS_ACTION:
            return state.setIn(['userData', 'UseG2fa'], true);
        case SUBMIT_DISABLE_GOOGLE_SUCCESS_ACTION:
            return state.setIn(['userData', 'UseG2fa'], false);

        // Hot wallets
        case HOT_GET:
            return state
                .set('hotLoading', action.loading);
        case HOT_GET_SUCCESS:
            _debug('HOT_GET_SUCCESS: ', action);
            return state
                .set('hotLoading', action.loading)
                .set('hotWallets', fromJS(_.sortBy(action.data, ['Name'])));
        case HOT_GET_ERROR:
            return state
                .set('hotLoading', action.loading);

        // Sub wallets
        case TOTAL_RECEIVE_GET:
            return state
                .set('subLoading', action.loading);
        case TOTAL_RECEIVE_GET_SUCCESS:
            _debug('HOT_SUB_SUCCESS: ', action);
            return state
                .set('subLoading', action.loading)
                .set('totalReceived', fromJS(_.sortBy(action.data, ['Name'])));
        case TOTAL_RECEIVE_GET_ERROR:
            return state
                .set('subLoading', action.loading);

        // Verification
        case SAVE_VERIFICATION_DATA_SUCCESS_ACTION:
            return state
                .setIn(['userData', 'KycStatus'], 'sent');
        case CHECK_VERIFICATION_SUCCESS_ACTION:
            return state
                .setIn(['userData', 'KycStatus'], 'in_work')
                .setIn(['userData', 'VerificationStatus'], 'in_progress');
        case CANCEL_VERIFICATION_SUCCESS_ACTION:
            return state
                .setIn(['userData', 'KycStatus'], '');
        case POR_SUCCESS_ACTION:
            return state
                .setIn(['userData', 'PorStatus'], 'sent');

        case SET_CONSENT:
            return state
                .set('consent', action.consent);

        case CHECK_CONSENT_SUCCESS:
            return state
                .set('isConsentInfoGet', true)
                .set('consentInfo', fromJS(action.data));
        // case CHECK_CONSENT_ERROR:
        //     return state
        //         .set('isConsentInfoGet', true)
        //         .set('consentInfo', 'consent info error');
        case CHECK_CONSENT_RESET:
            return state
                .set('isConsentInfoGet', false)
                .set('consentInfo', fromJS({requestedScopes: []}));
        case CHECK_CONSENT_RESET_SCOPES:
            return state
                .setIn(['consentInfo', 'requestedScopes'], fromJS([]));

        case OPEN_CONTACT_US:
            return state
                .setIn(['contactUs', 'isLoading'], false)
                .setIn(['contactUs', 'isOpened'], true);
        case CLOSE_CONTACT_US:
            return state
                .setIn(['contactUs', 'isOpened'], false);

        case CONTACT_US_ERRORS_SHOWN:
            return state
                .setIn(['contactUs', 'formErrors'], []);

        case SEND_CONTACT_US:
            return state
                .setIn(['contactUs', 'isLoading'], true);
        case SEND_CONTACT_US_SUCCESS:
            return state
                .setIn(['contactUs', 'isLoading'], false)
                .setIn(['contactUs', 'isOpened'], false);
        case SEND_CONTACT_US_ERROR:
            return state
                .setIn(['contactUs', 'isLoading'], false)
                .setIn(['contactUs', 'formErrors'], action.errors);

        default:
            return state;
    }
}

export default appReducer;
