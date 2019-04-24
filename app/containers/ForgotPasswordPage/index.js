/*
 *
 * ForgotPasswordPage
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

import ForgotPasswordForm from 'components/ForgotPasswordForm';

import {
    submitForgotPassword,
} from 'core/containers/ForgotPasswordPage/actions';

import {
    SUBMIT_FORGOT_PASSWORD_SUCCESS,
    SUBMIT_FORGOT_PASSWORD_ERROR,
} from 'core/containers/ForgotPasswordPage/constants';

import makeSelectForgotPasswordPage from 'core/containers/ForgotPasswordPage/selectors';

import { onSubmitActions } from 'utils/formSubmit';

export class ForgotPasswordPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={
                    "content content_slim main__container"
                    + ((this.props.ForgotPasswordPage.isSuccess) ? ' main__forgot__success' : '')
                }>
                <Helmet
                    title="Forgot Password"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />

                <div className="main__column main__column-single">
                    <div className="main__column__text">
                        <h1 className="main__title"><FormattedMessage {...messages.header} /></h1>
                        <p className="main__subtitle text-center content-padding-horizontal">
                            {
                                (this.props.ForgotPasswordPage.isSuccess) ? (
                                    <FormattedMessage {...messages.check} />
                                ) : (
                                    <FormattedMessage {...messages.remind} />
                                )
                            }
                        </p>
                    </div>

                    <div className="main__form__forgot">
                        <ForgotPasswordForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(submitForgotPassword, SUBMIT_FORGOT_PASSWORD_SUCCESS, SUBMIT_FORGOT_PASSWORD_ERROR) }
                        />
                    </div>

                </div>
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {

};

const mapStateToProps = createStructuredSelector({
    ForgotPasswordPage: makeSelectForgotPasswordPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
