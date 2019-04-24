/*
 * SigninForm Messages
 *
 * This contains all the text for the SigninForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.SigninForm.header',
        defaultMessage: 'Sign In',
    },
    email: {
        id: 'boilerplate.containers.SigninForm.email',
        defaultMessage: 'E-mail address',
    },
    pass: {
        id: 'boilerplate.containers.SigninForm.pass',
        defaultMessage: 'Password',
    },
    forgot: {
        id: 'boilerplate.containers.SigninForm.forgot',
        defaultMessage: 'Forgot password?',
    },
    notificationConsentHeader: {
        id: 'boilerplate.containers.SigninForm.notificationConsentHeader',
        defaultMessage: 'Consent error',
    },
    notificationConsentMessage: {
        id: 'boilerplate.containers.SigninForm.notificationConsentMessage',
        defaultMessage: 'Please Sign In one more time.',
    },
});
