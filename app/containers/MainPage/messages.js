/*
 * MainPage Messages
 *
 * This contains all the text for the MainPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.MainPage.header',
        defaultMessage: 'Single account and {onestop} KYC for all ICOs',
    },
    onestop: {
        id: 'boilerplate.containers.MainPage.onestop',
        defaultMessage: 'one-stop',
    },
    subheader: {
        id: 'boilerplate.containers.MainPage.subheader',
        defaultMessage: 'The easiest way to participate in the most prominent ICO campaigns!',
    },
    register: {
        id: 'boilerplate.containers.MainPage.register',
        defaultMessage: 'Register',
    },
    doregister: {
        id: 'boilerplate.containers.MainPage.doregister',
        defaultMessage: 'Don\'t have an account? {name}',
    },
});
