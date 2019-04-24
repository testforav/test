/*
 *
 * SigninPage
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

import makeSelectSigninPage from 'core/containers/SigninPage/selectors';

import SigninForm from 'components/SigninForm';
import GaCodeConfirmationForm from 'components/GaCodeConfirmationForm';

import {
    makeSelectConsent
} from 'core/containers/App/selectors';

import {
    loginUser,
    submitGACode,
    needGA,
} from 'core/containers/SigninPage/actions';

import {
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,

    GA_CODE_SEND_SUCCESS,
    GA_CODE_SEND_ERROR,
} from 'core/containers/SigninPage/constants';

import { onSubmitActions } from 'utils/formSubmit';

export class SigninPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.dispatch(needGA(false));
    }
    render() {
        return (
            <div className="content content_slim main__container">
                <Helmet
                    title="Signin"
                    meta={[
                        { name: 'description', content: this.props.intl.formatMessage(messages.meta) },
                    ]}
                />

                <div className="main__column main__column-single">
                    <div className="main__column__text">
                        <h1 className="main__title"><FormattedMessage {...messages.header} /></h1>
                    </div>

                    {(this.props.SigninPage.needGa) ? (
                        <GaCodeConfirmationForm
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(submitGACode, GA_CODE_SEND_SUCCESS, GA_CODE_SEND_ERROR) }
                            initialValues={
                                {
                                    Consent: this.props.consent,
                                }
                            }
                        />
                    ) : (
                        <SigninForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(loginUser, AUTH_USER_SUCCESS, AUTH_USER_ERROR) }
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
                                name: <Link to={"/signup"}><FormattedMessage {...messages.register} /></Link>
                            }}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

SigninPage.propTypes = {

};

const mapStateToProps = createStructuredSelector({
    SigninPage: makeSelectSigninPage(),
    consent: makeSelectConsent(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SigninPage));
