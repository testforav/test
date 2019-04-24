/*
 *
 * PasswordResetPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import makeSelectPasswordResetPage from 'core/containers/PasswordResetPage/selectors';
import { onSubmitActions } from 'utils/formSubmit';

import {
    submitPasswordResetPage,
    changePasswordResetPagePassword,
    changePasswordResetPagePasswordRepeat,
} from 'core/containers/PasswordResetPage/actions';

import {
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from 'core/containers/PasswordResetPage/constants';

import messages from './messages';

import PasswordResetPageForm from 'components/PasswordResetPageForm'

export class PasswordResetPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    // onSubmit(evt) {
    //     evt.preventDefault();
    //     this.props.dispatch(submitPasswordResetPage(this.props.PasswordResetPage.password, this.props.location.query.token))
    // }
    // onChangePassword(evt) {
    //     this.props.dispatch(changePasswordResetPagePassword(evt.target.value));
    // }
    // onChangePasswordRepeat(evt) {
    //     this.props.dispatch(changePasswordResetPagePasswordRepeat(evt.target.value));
    // }
    render() {
        return (
            <div className="content content_slim main__container">
                <Helmet
                    title="Password Reset"
                    meta={[
                        { name: 'description', content: this.props.intl.formatMessage(messages.meta) },
                    ]}
                />

                <div className="main__column main__column-single">
                    <div className="main__column__text">
                        <h1 className="main__title"><FormattedMessage {... messages.header} /></h1>
                    </div>

                    <PasswordResetPageForm
                        getFormState={state => state.get('form')}
                        {... this.props}
                        onSubmit={ onSubmitActions(submitPasswordResetPage, SUBMIT_SUCCESS_ACTION, SUBMIT_ERROR_ACTION) }
                        initialValues={{
                            token: this.props.location.query.token
                        }}
                    />

                </div>
            </div>
        );
    }
}

PasswordResetPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    PasswordResetPage: makeSelectPasswordResetPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,

        // onChangePassword: (evt) => dispatch(changePasswordResetPagePassword(evt.target.value)),
        // onChangePasswordRepeat: (evt) => dispatch(changePasswordResetPagePasswordRepeat(evt.target.value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PasswordResetPage));
