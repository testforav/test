/*
 * SecurityPage Messages
 *
 * This contains all the text for the SecurityPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.SecurityPage.header',
        defaultMessage: 'Two-Factor Authentication',
    },
    subheader: {
        id: 'boilerplate.containers.SecurityPage.subheader',
        defaultMessage: 'Two-Factor Authentication makes your account strongly secure.',
    },
    title2fa: {
        id: 'boilerplate.containers.SecurityPage.title2fa',
        defaultMessage: 'Two-factor authentication',
    },
    titlegoole: {
        id: 'boilerplate.containers.SecurityPage.titlegoole',
        defaultMessage: 'Google Authenticator',
    },
    backupcodes: {
        id: 'boilerplate.containers.SecurityPage.backupcodes',
        defaultMessage: 'Backup Codes',
    },
    disable: {
        id: 'boilerplate.containers.SecurityPage.disable',
        defaultMessage: 'Disable Authentication',
    },
    enable: {
        id: 'boilerplate.containers.SecurityPage.enable',
        defaultMessage: 'Enable Authentication',
    },
    latestact: {
        id: 'boilerplate.containers.SecurityPage.latestact',
        defaultMessage: 'Latest Activity',
    },
    latestactdescr: {
        id: 'boilerplate.containers.SecurityPage.latestactdescr',
        defaultMessage: 'The activity history displays information about time, IP addresses and devices from which your profile has been recently accessed. If you see any suspicious activity, you can terminate it here.',
    },
    devicetype: {
        id: 'boilerplate.containers.SecurityPage.devicetype',
        defaultMessage: 'Device type',
    },
    devicetypeip: {
        id: 'boilerplate.containers.SecurityPage.devicetypeip',
        defaultMessage: 'Device type / IP',
    },
    lastusedat: {
        id: 'boilerplate.containers.SecurityPage.lastusedat',
        defaultMessage: 'Last used at',
    },
    ipaddress: {
        id: 'boilerplate.containers.SecurityPage.ipaddress',
        defaultMessage: 'IP address',
    },
    gasettings: {
        id: 'boilerplate.containers.SecurityPage.gasettings',
        defaultMessage: 'Google Authenticator settings',
    },
    gahelp: {
        id: 'boilerplate.containers.SecurityPage.gahelp',
        defaultMessage: 'Please download the Google Authenticator app to your Android or Apple device. If you need help with this step, please see the {googlesupport}. Apart from the Android Market and App Store, you can get Google Authenticator from {androidlink}, {chromeplugin} or {appstore}.',
    },
    gahelp2: {
        id: 'boilerplate.containers.SecurityPage.gahelp2',
        defaultMessage: 'Scan the QR code or enter the secret key provided below. Then, to confirm the correct setting for the application, enter the verification code from the application.',
    },
    backupcodeshint1: {
        id: 'boilerplate.containers.SecurityPage.backupcodeshint1',
        defaultMessage: 'Should you ever lose your phone, each of these codes can be used one time to regain access to your account',
    },
    backupcodeshint2: {
        id: 'boilerplate.containers.SecurityPage.backupcodeshint2',
        defaultMessage: 'Keep these codes in a {safeplace}',
    },
    backupcodeshint2safeplace: {
        id: 'boilerplate.containers.SecurityPage.backupcodeshint2safeplace',
        defaultMessage: 'safe place',
    },
    newcodes: {
        id: 'boilerplate.containers.SecurityPage.newcodes',
        defaultMessage: 'Generate new codes',
    },
    sure: {
        id: 'boilerplate.containers.SecurityPage.sure',
        defaultMessage: 'Are you sure?',
    },
    invalid: {
        id: 'boilerplate.containers.SecurityPage.invalid',
        defaultMessage: 'Old backup codes will become invalid',
    },
});
