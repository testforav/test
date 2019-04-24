/*
 *
 * TestPage actions
 *
 */

 import {
     CHANGE_USERNAME,
     CHANGE_PASSWORD,
     CHANGE_GA_CODE,

     AUTH_USER,
     AUTH_USER_SUCCESS,
     AUTH_USER_ERROR,

     GA_CODE_SEND,
     GA_CODE_SEND_SUCCESS,
     GA_CODE_SEND_ERROR,

     SOCIAL_GOOGLE_SIGNIN,
     SOCIAL_GOOGLE_SIGNIN_SUCCESS,
     SOCIAL_GOOGLE_SIGNIN_ERROR,

     SOCIAL_FACEBOOK_SIGNIN,
     SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
     SOCIAL_FACEBOOK_SIGNIN_ERROR,

     ERRORS_SHOWN,
     NEED_GA,

     SEND_CONSENT,
     SEND_CONSENT_SUCCESS,
     SEND_CONSENT_ERROR,
 } from './constants';

 export function errorsShown() {
     return {
         type: ERRORS_SHOWN
     };
 }

 export function changeUsername(email) {
     return {
         type: CHANGE_USERNAME,
         email,
     };
 }

 export function changeGaCode(gaCode) {
     return {
         type: CHANGE_GA_CODE,
         gaCode,
     };
 }

 export function changePassword(password) {
     // _debug(password);
     return {
         type: CHANGE_PASSWORD,
         password,
     };
 }

 export function loginUser(email, password, captcha, consent) {
     return {
         type: AUTH_USER,
         auth: false,
         loading: true,
         email,
         password,
         consent,
         captcha,
     };
 }

 export function loginUserSuccess(res) {
     _debug('loginUserSuccess: ', res);

     return {
         type: AUTH_USER_SUCCESS,
         auth: true,
         authData: res.Result,
         loading: false
     };
 }

 export function loginUserError(errors) {
     _debug('loginUserError: ', errors);

     return {
         type: AUTH_USER_ERROR,
         loading: false,
         errors
     };
 }

 // 2fa Verification
 export function needGA(value) {
     return {
         type: NEED_GA,
         value,
     }
 }
 export function submitGACode(code, consent) {
     return {
         type: GA_CODE_SEND,
         loading: true,
         code,
         consent,
     };
 }

 export function submitGACodeSuccess(res) {
     return {
         type: GA_CODE_SEND_SUCCESS,
         loading: false,
         data: res.result
     };
 }

 export function submitGACodeError(errors) {
     return {
         type: GA_CODE_SEND_ERROR,
         loading: false,
         errors
     };
 }

 // Google
 // Social Google
 export function signinUserGoogle(data, consent) {
     return {
         type: SOCIAL_GOOGLE_SIGNIN,
         auth: false,
         loading: true,
         data,
         consent
     };
 }

 export function signinUserGoogleSuccess(res) {
     _debug('signinUserSuccess: ', res);

     return {
         type: SOCIAL_GOOGLE_SIGNIN_SUCCESS,
         data: res.Result,
     };
 }

 export function signinUserGoogleError(errors) {
     _debug('signinUserError: ', errors);

     return {
         type: SOCIAL_GOOGLE_SIGNIN_ERROR,
         loading: false,
         errors
     };
 }

 // Social Facebook
 export function signinUserFacebook(data, consent) {
     return {
         type: SOCIAL_FACEBOOK_SIGNIN,
         auth: false,
         loading: true,
         data,
         consent
     };
 }

 export function signinUserFacebookSuccess(res) {
     _debug('signinUserSuccess: ', res);

     return {
         type: SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
         data: res.Result,
     };
 }

 export function signinUserFacebookError(errors) {
     _debug('signinUserError: ', errors);

     return {
         type: SOCIAL_FACEBOOK_SIGNIN_ERROR,
         loading: false,
         errors
     };
 }

 // Send consent
 export function sendConsent(consent, requestedScopes) {
     return {
         type: SEND_CONSENT,
         loading: true,
         consent,
         requestedScopes
     };
 }

 export function sendConsentSuccess(res) {
     return {
         type: SEND_CONSENT_SUCCESS,
         data: res.Result,
         loading: false,
     };
 }

 export function sendConsentError(errors) {
     return {
         type: SEND_CONSENT_ERROR,
         errors,
         loading: false,
     };
 }
