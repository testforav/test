/*
 * Error Messages
 *
 * This contains all the text for the Error component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    requiredMessage: {
        id: 'app.components.Error.requiredMessage',
        defaultMessage: 'This field is required',
    },
    repeatPasswordMessage: {
        id: 'app.components.Error.repeatPasswordMessage',
        defaultMessage: 'Passwords should be equal',
    },
    emailMessage: {
        id: 'app.components.Error.emailMessage',
        defaultMessage: '"{value}" isnt an Email.',
    },
    wrongPhoneMessaqge: {
        id: 'app.components.Error.wrongPhoneMessaqge',
        defaultMessage: '"{value}" isnt a Phone.',
    },
});
