/**
*
* PasswordResetPage
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc';
import { showApiValidateError } from 'utils/helpers';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import zxcvbn from 'zxcvbn';

import messages from './messages';

import { errorsShown } from 'core/containers/PasswordResetPage/actions';
import PasswordWithPreview from 'components/PasswordWithPreview';

// redux-form components
import { Field, reduxForm } from 'redux-form';
import Button from 'components/basic/Button';
import Password from 'components/form/Password';
import Input from 'components/form/Input';
import PasswordRepeat from 'components/form/PasswordRepeat';
import { required, passwordEqual } from 'utils/validators';

class PasswordResetPageForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            passStrScore: 'none',
        };
    }

    onPassKeyup(evt) {
        setTimeout(() => {
            const strState = evt.target.value ? zxcvbn(evt.target.value).score : 'none'
            this.setState({
                passStrScore: strState
            });
        }, 1);
    }

    render() {
        return (
            <div className="main__form">
                <form
                    className={
                        'signup__form'
                        + (this.props.PasswordResetPage.isFormLoading ? ' block-loading light' : '')
                    }
                    onSubmit={ this.props.handleSubmit }
                    ref={(form) => {
                        this.form = form;
                    }}
                >

                <Field
                    component={Input}
                    name="token"
                    disabled={true}
                    autoComplete="off"
                    type="hidden"
                />

                <div className="form-group form-control-wrap form-group_section">
                    <Field
                        ref={(element) => {this.passwordField = element}}
                        component={Password}
                        className="form-control"
                        placeholder="Password"
                        id="pass"
                        name="pass"
                        autoComplete="off"
                        tabIndex={1}
                        label={(<FormattedMessage {...messages.newpass} />)}
                        view="round"
                        onChange={this.onPassKeyup.bind(this)}
                        validate={ [ required, passwordEqual ] }
                    />
                    <div
                        className={
                            'password-strength-wrap score-'
                            + this.state.passStrScore
                        }
                    >
                        <div className="password-strength__bar"></div>
                        <div className="password-strength__bar"></div>
                        <div className="password-strength__bar"></div>
                    </div>
                </div>
                <div className="form-group form-control-wrap form-group_section">
                    <Field
                        ref={(element) => {this.passwordConfirmField = element}}
                        component={Password}
                        className="form-control"
                        placeholder="Repeat Password"
                        id="password_repeat"
                        name="password_repeat"
                        autoComplete="off"
                        label={(<FormattedMessage {...messages.repeatnew} />)}
                        view="round"
                        tabIndex={1}
                        validate={ [ required, passwordEqual ] }
                    />
                </div>

                    <div className="form-group text-center">
                        <Button className="btn btn_uppercase btn_rounded btn_bold btn_gradient_green btn_block form__submit">
                            <FormattedMessage {...messages.cont} />
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

PasswordResetPageForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'passwordReset'
})(PasswordResetPageForm);

export default injectIntl(withReduxForm);
