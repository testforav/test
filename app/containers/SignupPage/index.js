/*
 *
 * SignupPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import {
    makeSelectConsent
} from 'core/containers/App/selectors';

import SignupForm from 'components/SignupForm';
import SignupPinForm from 'components/SignupPinForm';
import GaCodeConfirmationForm from 'components/GaCodeConfirmationForm';

import {
    signupUser,
    changeCodeConfirm,

    resendEmail,
    resetToken,
} from 'core/containers/SignupPage/actions';

import {
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,

    CONFIRM_CODE_SEND_SUCCESS,
    CONFIRM_CODE_SEND_ERROR,
} from 'core/containers/SignupPage/constants';

import { onSubmitActions } from 'utils/formSubmit';

import makeSelectSignupPage from 'core/containers/SignupPage/selectors';
import makeSelectSigninPage from 'core/containers/SigninPage/selectors';

export class SignupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(resetToken());
    }
    render() {

        return (
            <div className="content content_slim main__container">
                <Helmet
                    title="Signup"
                    meta={[
                        { name: 'description', content: this.props.intl.formatMessage(messages.meta) },
                    ]}
                />

                <div className="main__column main__column-single">
                    <div className="main__column__text">
                        <h1 className="main__title"><FormattedMessage {...messages.header} /></h1>
                    </div>

                    {(this.props.SignupPage.token) ? (
                        <SignupPinForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(changeCodeConfirm, CONFIRM_CODE_SEND_SUCCESS, CONFIRM_CODE_SEND_ERROR) }
                            initialValues={
                                {
                                    Token: this.props.SignupPage.token,
                                    Consent: this.props.consent,
                                }
                            }
                        />
                    ) : (
                        <SignupForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(signupUser, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR) }
                            initialValues={
                                {
                                    Consent: this.props.consent,
                                }
                            }
                        />
                    )}

                    <div className="text-center main__signup__text">
                        <FormattedMessage
                            {...messages.doregister}
                            values={{
                                name: <Link to={"/signin"}><FormattedMessage {...messages.register} /></Link>
                            }}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {

};

const mapStateToProps = createStructuredSelector({
    SignupPage: makeSelectSignupPage(),
    SigninPage: makeSelectSigninPage(),
    consent: makeSelectConsent(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        resendEmail: (token) => {
            dispatch(resendEmail(token));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignupPage));
