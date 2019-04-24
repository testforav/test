/*
 *
 * AccountPage actions
 *
 */

 import {
     ERRORS_SHOWN,

     SEND_ACCOUNT_CHANGE,
     SEND_ACCOUNT_CHANGE_SUCCESS,
     SEND_ACCOUNT_CHANGE_ERROR,

     SAVE_EMAIL_AGREEMENT,
     SAVE_EMAIL_AGREEMENT_SUCCESS,
     SAVE_EMAIL_AGREEMENT_ERROR,
 } from './constants';

 export function errorsShown() {
     return {
         type: ERRORS_SHOWN
     };
 }

// Account
 export function sendAccountChange(formData) {
     return {
         type: SEND_ACCOUNT_CHANGE,
         loading: true,
         formData,
     };
 }

 export function sendAccountChangeSuccess(res) {
     return {
         type: SEND_ACCOUNT_CHANGE_SUCCESS,
         loading: false,
         data: res.Result
     };
 }

 export function sendAccountChangeError(errors) {
     return {
         type: SEND_ACCOUNT_CHANGE_ERROR,
         loading: false,
         errors
     };
 }

// Email agreement
 export function saveEmailAgreement(EnableMarketingEmails) {
     return {
         type: SAVE_EMAIL_AGREEMENT,
         loading: true,
         EnableMarketingEmails,
     };
 }

 export function saveEmailAgreementSuccess(res) {
     return {
         type: SAVE_EMAIL_AGREEMENT_SUCCESS,
         loading: false,
         data: res.Result
     };
 }

 export function saveEmailAgreementError(errors) {
     return {
         type: SAVE_EMAIL_AGREEMENT_ERROR,
         loading: false,
         errors
     };
 }
