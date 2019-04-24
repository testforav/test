/**
*
* SignupForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import zxcvbn from 'zxcvbn';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import {
    signupUserGoogle,
    signupUserFacebook,
} from 'core/containers/SignupPage/actions';

// redux-form components
import { Field, reduxForm } from 'redux-form';
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import InputRound from 'components/form/InputRound';
import Password from 'components/form/Password';
import Captcha from 'components/form/Captcha';
import Checkbox from 'components/form/Checkbox';
import { required, requiredCheckbox, email } from 'utils/validators';

class SignupForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            passStrScore: 'none'
        };
    }

    onPassKeyup(evt) {
        const value = evt.target.value;
        const score = zxcvbn(value).score;
        const strState = value ? score : 'none';

        this.setState({
            passStrScore: strState
        });
    }

    successGoogle(response) {
        _debug('successGoogle: ', response);

        this.props.dispatch(signupUserGoogle(response, this.props.consent));
    }

    errorGoogle(response) {
        _debug('errorGoogle: ', response);
    }

    responseFacebook(response) {
        _debug('responseFacebook: ', response);

        if (response && response.accessToken) {
            this.props.dispatch(signupUserFacebook(response, this.props.consent));
        } else {

        }
    }

    facebookClicked(e) {
        _debug('componentClicked: ', e);
    }

    render() {
        return (
            <div className="main__form">
                <form
                    className={
                        'signup__form'
                        + (this.props.submitting ? ' block-loading light' : '')
                    }
                    action="/"
                    onSubmit={ this.props.handleSubmit }
                >
                    <div className="form-group form-control-wrap form-group_section">
                        <Field
                            className="form-control"
                            type="email"
                            id="Email"
                            placeholder={this.props.intl.formatMessage(messages.email)}
                            name="Email"
                            tabIndex="1"
                            label={(<FormattedMessage {...messages.email} />)}
                            component={InputRound}
                            validate={[ required, email ]}
                        />
                    </div>
                    <div className="form-group form-control-wrap form-group_section">
                        <div className="">
                            <Field
                                className="form-control"
                                placeholder={this.props.intl.formatMessage(messages.pass)}
                                id="pass"
                                name="Password"
                                tabIndex="2"
                                label={(<FormattedMessage {...messages.pass} />)}
                                view="round"
                                component={Password}
                                onChange={this.onPassKeyup.bind(this)}
                                validate={[ required ]}
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

                        <div className="content-padding-vertical text-secondary signup__form__hint">
                            <FormattedMessage {...messages.advice} />
                        </div>

                        <div className="text-left small">
                            <label htmlFor="tos_argee" className="checkbox-container">
                                <Field
                                    name="tos_argee"
                                    id="tos_argee"
                                    component={Checkbox}
                                    validate={[ requiredCheckbox ]}
                                    />
                                <span>
                                    I agree to the ICOSID <a target="_blank" href="/tos">Terms of Service</a> and <a target="_blank" href="/privacypolicy">Privacy Policy</a>
                                </span>
                            </label>
                        </div>
                    </div>

                    <Field
                        className="form-control"
                        type="hidden"
                        disabled={true}
                        id="Consent"
                        name="Consent"
                        component={Input}
                    />

                    <div className="text-center">
                        <Button
                            uppercase
                            rounded
                            bold
                            gradient
                            block
                            formSubmit
                            tabIndex="3"
                            disabled={!this.props.valid}
                        >
                            <FormattedMessage {...messages.header} />
                        </Button>
                    </div>

                    <div className="main__form__separator">
                        <div className="main__form__separator__title">OR</div>
                    </div>

                    <div className="form-group" style={{display: 'none'}}>
                        <GoogleLogin
                          clientId={process.env.CONFIG.social.google}
                          buttonText="Sign In with Google"
                          className="btn btn_uppercase btn_rounded btn_bold btn_google btn_block"
                          autoLoad={false}
                          onSuccess={this.successGoogle.bind(this)}
                          onFailure={this.errorGoogle.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <FacebookLogin
                            appId={process.env.CONFIG.social.facebook}
                            autoLoad={false}
                            cssClass={'btn btn_uppercase btn_rounded btn_bold btn_facebook btn_block'}
                            textButton="Sign In with Facebook"
                            fields="name,email,picture"
                            onClick={this.facebookClicked}
                            callback={this.responseFacebook.bind(this)}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

SignupForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'signUp'
})(SignupForm);

export default injectIntl(withReduxForm);
