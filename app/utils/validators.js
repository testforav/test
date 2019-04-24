import validator from 'validator';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';

import messages from 'components/form/Error/messages';

export const required = (value) =>
    value ? undefined : messages.requiredMessage;
export const requiredCheckbox = (value) =>
    value ? undefined : messages.requiredMessage;
export const email = (value) =>
    validator.isEmail(value) ? undefined : messages.emailMessage;
export const repeatPassword = (value) =>
    value ? undefined : messages.repeatPasswordMessage;
export const phone = (value) =>
    (!value || /^[^a-z\!@#\$\%\^\*\&]+$/gi.test(value)) ? undefined : messages.wrongPhoneMessaqge;
export const passwordEqual = (value, data, form, name) => {
    const formValues = data;
    const password = formValues.pass || '';
    const passwordConfirm = formValues.password_repeat || '';
    const isBothUsed = !!password && !!passwordConfirm;

    _debug('passwordEqual: ', password, passwordConfirm);

    if ((password === passwordConfirm) || !isBothUsed) {
        return undefined;
    } else {
        return 'Passwords should be equal';
    }
}
