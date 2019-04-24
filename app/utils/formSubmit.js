import { formSubmit } from 'core/containers/App/actions';
import { SubmissionError } from 'redux-form';

export function onSubmitActions(submitAction, SUCCESS_ACTION, ERROR_ACTION) {
    return (values, dispatch) =>
        new Promise((resolve, reject) => {
            dispatch(formSubmit(submitAction, SUCCESS_ACTION, ERROR_ACTION, values, resolve, reject));
        }).catch(({ errors }) => {
            const res = { Captcha: "Some error" };
            if (errors && errors.length) {
                for (let i = 0, l = errors.length; i < l; i++) {
                    res[errors[i].Key] = errors[i].Message;
                }
                res._error = res;
                throw new SubmissionError(res);
            }
        });
}