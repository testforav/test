/*
 *
 * PasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import makeSelectPasswordPage from 'core/containers/PasswordPage/selectors';

import PasswordPageForm from 'components/PasswordPageForm';
import ProfileWithSidebar from 'components/ProfileWithSidebar';
import { onSubmitActions } from 'utils/formSubmit';

import {
    sendPasswordChange,
} from 'core/containers/PasswordPage/actions';
import {
    SEND_PASSWORD_CHANGE_SUCCESS,
    SEND_PASSWORD_CHANGE_ERROR,
} from 'core/containers/PasswordPage/constants';

export class PasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <div
                    className={
                        'profile__section account'
                    }
                >
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>

                    <div className="form-group form-group_section text-secondary">
                        <FormattedMessage {...messages.warning1} /><br />
                        <FormattedMessage {...messages.warning2} />
                    </div>

                    <div className="account__content">
                        <PasswordPageForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(sendPasswordChange, SEND_PASSWORD_CHANGE_SUCCESS, SEND_PASSWORD_CHANGE_ERROR) }
                        />
                    </div>
                </div>
            </ProfileWithSidebar>
        );
    }
}

PasswordPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    PasswordPage: makeSelectPasswordPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PasswordPage));
