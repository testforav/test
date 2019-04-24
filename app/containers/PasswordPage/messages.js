/*
 * PasswordPage Messages
 *
 * This contains all the text for the PasswordPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.PasswordPage.header',
        defaultMessage: 'Password Change',
    },
    warning1: {
        id: 'boilerplate.containers.PasswordPage.warning1',
        defaultMessage: '—  All the usual warning about good passwords apply, plus it\'s your money!',
    },
    warning2: {
        id: 'boilerplate.containers.PasswordPage.warning2',
        defaultMessage: '—  For your protection, we must be very conservative when processing password reset requests.',
    },
    changeSuccessMessage: {
        id: 'boilerplate.containers.PasswordPage.changeSuccessMessage',
        defaultMessage: 'Password has been changed',
    },
});
