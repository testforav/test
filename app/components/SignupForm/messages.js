/*
 * SignupForm Messages
 *
 * This contains all the text for the SignupForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.SignupForm.header',
        defaultMessage: 'Sign Up',
    },
    email: {
        id: 'boilerplate.containers.SignupForm.email',
        defaultMessage: 'E-mail',
    },
    pass: {
        id: 'boilerplate.containers.SignupForm.pass',
        defaultMessage: 'Password',
    },
    advice: {
        id: 'boilerplate.containers.SignupForm.advice',
        defaultMessage: 'Your password must be at least 8 characters in length. We strongly encourage you to include a combination of letters, numbers, and special characters (such as !@#$%^*).',
    },
});
