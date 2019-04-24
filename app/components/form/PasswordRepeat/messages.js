/*
 * PasswordPage Messages
 *
 * This contains all the text for the PasswordPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    newpass: {
        id: 'boilerplate.containers.PasswordPage.newpass',
        defaultMessage: 'New password',
    },
    advice: {
        id: 'boilerplate.containers.PasswordPage.advice',
        defaultMessage: 'Your password must be at least 8 characters in length. We strongly encourage you to include a combination of letters, numbers, and special characters (such as !@#$%^*).',
    },
    confirm: {
        id: 'boilerplate.containers.PasswordPage.confirm',
        defaultMessage: 'Confirm password',
    },
});
