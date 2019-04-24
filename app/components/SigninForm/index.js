/**
*
* SigninForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// redux-form components
import { Field, reduxForm } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import InputRound from 'components/form/InputRound';
import Password from 'components/form/Password';
import Captcha from 'components/form/Captcha';
import { required, email } from 'utils/validators';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import { showApiValidateError } from 'utils/helpers';
import {
    errorsShown,
    signinUserGoogle,
    signinUserFacebook
} from 'core/containers/SigninPage/actions';
import PasswordWithPreview from 'components/PasswordWithPreview';
import { showNotification, setConsent } from 'core/containers/App/actions';

class SigninForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showCaptcha: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error && nextProps.error.Consent) {
            this.props.dispatch(setConsent(''));
            this.props.change('Consent', '');
            this.props.dispatch(showNotification({
                type: 'danger',
                headline: messages.notificationConsentHeader,
                message: messages.notificationConsentMessage,
                timeout: 15000,
            }));
        }
        if (nextProps.error && nextProps.error.Captcha) {
            this.setState({
                showCaptcha: true,
            });
            this.props.change('Captcha', '');
            this.recaptchaInstance && this.recaptchaInstance.reset();
        }
    }

    successGoogle(response) {
        _debug('successGoogle: ', JSON.stringify(response));

        this.props.dispatch(signinUserGoogle(response, this.props.consent));
    }

    errorGoogle(response) {
        _debug('errorGoogle: ', response);
    }

    responseFacebook(response) {
        _debug('responseFacebook: ', response);

        if (response && response.accessToken) {
            this.props.dispatch(signinUserFacebook(response, this.props.consent));
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
                        'main-page__register'
                        + (this.props.submitting ? ' block-loading light' : '')
                    }
                    onSubmit={ this.props.handleSubmit }
                >
                    {
                        this.props.showTitle ? (
                            <h3 className="main-page__register__title text-center">
                                <FormattedMessage {...messages.header} />
                            </h3>
                        ) : null
                    }
                    <div className="form-group">
                        <Field
                            className="form-control"
                            type="email"
                            id="Username"
                            placeholder={this.props.intl.formatMessage(messages.email)}
                            name="Username"
                            tabIndex="1"
                            label={(<FormattedMessage {...messages.email} />)}
                            component={InputRound}
                            validate={[ required, email ]}
                        />
                    </div>
                    <div className="form-group form-group_section password-sneaker">
                        <Field
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.pass)}
                            id="pass"
                            name="Password"
                            tabIndex="2"
                            label={(<FormattedMessage {...messages.pass} />)}
                            view="round"
                            component={Password}
                            validate={[ required ]}
                        />
                        <div className="text-hint text-muted">
                            <Link className="link-muted forgot-link" to="/forgot-password"><FormattedMessage {...messages.forgot} /></Link>
                        </div>
                    </div>

                    {
                        this.state.showCaptcha ? (
                            <div className="form-group">
                                <Field
                                    captchaRef={e => this.recaptchaInstance = e}
                                    id="Captcha"
                                    name="Captcha"
                                    component={Captcha}
                                    validate={[ required ]}
                                    dispatch={this.props.dispatch}
                                />
                            </div>
                        ) : null
                    }

                    <Field
                        type="hidden"
                        disabled={true}
                        id="Consent"
                        name="Consent"
                        component={Input}
                    />

                    <div className="">
                        <Button
                            uppercase
                            rounded
                            bold
                            gradient
                            block
                            formSubmit
                            tabIndex="3"
                            disabled={!this.props.valid}
                        ><FormattedMessage {...messages.header} /></Button>
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
                            callback={this.responseFacebook.bind(this)} />
                    </div>

                </form>
            </div>
        );
    }
}

SigninForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'signIn'
})(SigninForm);

export default injectIntl(withReduxForm);
