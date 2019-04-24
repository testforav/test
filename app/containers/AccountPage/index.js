/*
 *
 * AccountPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import ProfileWithSidebar from 'components/ProfileWithSidebar';
import ModalCommon from 'components/ModalCommon';
import PasswordWithPreview from 'components/PasswordWithPreview';

import makeSelectAccountPage from 'core/containers/AccountPage/selectors';

import AccountForm from 'components/AccountForm';

import {
    sendAccountChange,
    saveEmailAgreement,
} from 'core/containers/AccountPage/actions';

const languageList = [
    {
        name: 'English',
        language: 'en'
    },
    {
        name: 'Russian',
        language: 'ru'
    },
];

import {
    SEND_ACCOUNT_CHANGE_SUCCESS,
    SEND_ACCOUNT_CHANGE_ERROR,
} from 'core/containers/AccountPage/constants';

import { onSubmitActions } from 'utils/formSubmit';

export class AccountPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            language: 'en',
            country: 'us',

            FirstName: this.props.userData.get('FirstName'),
            MiddleName: this.props.userData.get('MiddleName'),
            LastName: this.props.userData.get('LastName'),
            Lang: this.props.userData.get('Lang'),
            Country: this.props.userData.get('Country'),
            Citizenship: this.props.userData.get('Citizenship'),
            Address: this.props.userData.get('Address'),
            DocumentNumber: this.props.userData.get('DocumentNumber'),
            EthWallet: this.props.userData.get('EthWallet'),

            EnableMarketingEmails: this.props.userData.get('EnableMarketingEmails'),
        };
    }

    render() {
        _debug('userData: ', this.props.userData.get('EnableMarketingEmails'), this.state.EnableMarketingEmails);

        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Account"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div
                    className={
                        'profile__section account'
                    }
                >
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>

                    <div className="account__content">
                        <AccountForm 
                            getFormState={state => state.get('form')} 
                            {... this.props}
                            onSubmit={ onSubmitActions(sendAccountChange, SEND_ACCOUNT_CHANGE_SUCCESS, SEND_ACCOUNT_CHANGE_ERROR) }
                            isDisabled={ this.props.userData.get('VerificationStatus') !== 'unverified' }
                            setEmailAgreement={
                                (value) => this.props.dispatch(saveEmailAgreement(value))
                            }
                            initialValues={
                                {
                                    FirstName: this.props.userData.get('FirstName'),
                                    MiddleName: this.props.userData.get('MiddleName'),
                                    LastName: this.props.userData.get('LastName'),
                                    Lang: this.props.userData.get('Lang'),
                                    Country: this.props.userData.get('Country'),
                                    Email: this.props.userData.get('Email'),
                                    Citizenship: this.props.userData.get('Citizenship'),
                                    Address: this.props.userData.get('Address'),
                                    DocumentNumber: this.props.userData.get('DocumentNumber'),
                                    EthWallet: this.props.userData.get('EthWallet'),
                                    EnableMarketingEmails: this.props.userData.get('EnableMarketingEmails'),
                                }
                            }
                        />
                    </div>
                </div>
            </ProfileWithSidebar>
        );
    }
}

AccountPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    AccountPage: makeSelectAccountPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
