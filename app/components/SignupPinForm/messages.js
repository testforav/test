/*
 * SignupPinForm Messages
 *
 * This contains all the text for the SignupPinForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    info: {
        id: 'boilerplate.containers.SignupPinForm.info',
        defaultMessage: 'We have sent you an Email with confirmation Pin-code. \n Please paste it to input below.',
    },
    pin: {
        id: 'boilerplate.containers.SignupPinForm.pin',
        defaultMessage: 'Pin',
    },
    send: {
        id: 'boilerplate.containers.SignupPinForm.send',
        defaultMessage: 'Send',
    },
    resended: {
        id: 'boilerplate.containers.SignupPinForm.resended',
        defaultMessage: 'Email was successfully resended',
    },
    resend: {
        id: 'boilerplate.containers.SignupPinForm.resend',
        defaultMessage: 'Didn\'t get an Email? {br} Please check "Spam" folder or {link}',
    },
    linkmsg: {
        id: 'boilerplate.containers.SignupPinForm.linkmsg',
        defaultMessage: 'resend',
    },
});
