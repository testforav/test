/*
 *
 * AccountPrivacyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectAccountPrivacyPage from 'core/containers/AccountPrivacyPage/selectors';
import Button from 'components/basic/Button';
import { Form, Textarea } from 'react-validation/lib/build/validation.rc';
import Recaptcha from 'react-recaptcha';
import _ from 'lodash';

import messages from './messages';
import ModalCommon from 'components/ModalCommon';
import ProfileWithSidebar from 'components/ProfileWithSidebar';
import { showNotification } from 'core/containers/App/actions';

import {
    deleteAccountSend,
    requestPersonalData,
} from 'core/containers/AccountPrivacyPage/actions';

const captchaKey = process.env.CONFIG.recaptcha;

export class AccountPrivacyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            showDataModal: false,
            captcha: '',
    		isCaptchaVerified: false,
            deleteRequestSent: false,
            dataRequestSent: false,
        }
    }

    // Modal
    openDeleteModal() {
        this.setState({
            showDeleteModal: true
        });
    }

    closeDeleteModal() {
        this.setState({
            showDeleteModal: false
        });
    }

    openDataModal() {
        this.setState({
            showDataModal: true
        });
    }

    closeDataModal() {
        this.setState({
            showDataModal: false
        });
    }

    // Recaptcha
    recaptchaVerify(key) {
        _debug('verifyCallback: ', key);

        this.setState({
            isCaptchaVerified: true,
            captcha: key
        });
    }

    recaptchaExpired() {
        this.setState({
            isCaptchaVerified: false,
            captcha: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.AccountPrivacyPage.deleteRequestSent && !this.state.deleteRequestSent) {
            this.setState({
                deleteRequestSent: true
            });
        }
        if (nextProps.AccountPrivacyPage.requestDataSent && !this.state.requestDataSent) {
            this.setState({
                requestDataSent: true
            });
            this.openDataModal();
        }
    }

    render() {
        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Account Privacy"
                    meta={[
                        { name: 'description', content: 'IcosID Account Privacy' },
                    ]}
                />
                <div className="profile__section account">
                    <h2 className="profile__section__header"><FormattedMessage {...messages.documentsHeader} /></h2>

                    <p className="profile__section__subheader">
                        <FormattedMessage
                            {...messages.documentsInfo}
                            />
                    </p>

                    <p className="profile__section__gdpr">
                        <a href="/tos" target="_blank"><i className="ico-document"></i> <span><FormattedMessage {...messages.termsOfService} /></span></a>
                    </p>
                    <p className="profile__section__gdpr">
                        <a href="/privacypolicy" target="_blank"><i className="ico-document"></i> <span><FormattedMessage {...messages.privacyPolicy} /></span></a>
                    </p>
                    <p className="profile__section__gdpr">
                        <a href="/cookiepolicy" target="_blank"><i className="ico-document"></i> <span><FormattedMessage {...messages.cookiePolicy} /></span></a>
                    </p>
                    <hr/>

                    <h2 className="profile__section__header"><FormattedMessage {...messages.documentsInfo} /></h2>

                    {
                        this.state.requestDataSent
                        ? (
                            <p className="profile__section__subheader">
                                <FormattedMessage
                                    {...messages.personalDataInfoRequestedHeader}
                                    /> <FormattedMessage
                                    {...messages.personalDataInfoRequested}
                                    values={{
                                        email: <span className="text-highlight">{this.props.userData.get('Email')}</span>
                                    }}
                                    />
                            </p>
                        )
                        : (
                            <p className="profile__section__subheader">
                                <FormattedMessage
                                    {...messages.personalDataInfo}
                                    />
                            </p>
                        )
                    }

                    <div className="account__content">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.dispatch(requestPersonalData());
                            }}
                            className={
                                "btn btn_uppercase btn_aqua btn_wide"
                                + (this.props.AccountPrivacyPage.requestDataLoading ? ' block-loading' : '')
                                + (this.state.requestDataSent ? ' hidden' : '')
                            }
                        >
                            <FormattedMessage {...messages.requestData} />
                        </button>
                    </div>

                    <hr/>

                    <h2 className="profile__section__header"><FormattedMessage {...messages.headerDeleting} /></h2>

                    <p className="profile__section__subheader"><FormattedMessage {...messages.subHeaderDeleting} /></p>

                    <div className="account__content">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.openDeleteModal();
                            }}
                            className="btn btn_uppercase btn_danger btn_wide"
                        >
                            <FormattedMessage {...messages.deleteAccount} />
                        </button>
                    </div>
                </div>

                <ModalCommon
                    showModal={this.state.showDeleteModal}
                    onHide={() => this.closeDeleteModal()}
                    className="modal-security"
                >
                    <div className="modal-security__title"><FormattedMessage {...messages.accDeleting} /></div>
                    <div
                        className={
                            ""
                            + (this.props.AccountPrivacyPage.deleteLoading ? ' block-loading light' : '')
                        }
                    >
                        {
                            this.state.deleteRequestSent
                            ? (
                                <div>
                                    <p><FormattedMessage {...messages.accDeletingAccepted} /></p>
                                </div>
                            )
                            : (
                                <Form
                                    onSubmit={
                                        (evt) => {
                                            evt.preventDefault();

                                            if (!this.props.isLoading) {
                                                if (!this.state.isCaptchaVerified) {
                                                    this.props.dispatch(showNotification({
                                                        type: 'danger',
                                                        headline: messages.notificationHeader,
                                                        message: messages.notificationMessage,
                                                    }));
                                                } else {
                                                    this.props.dispatch(deleteAccountSend());
                                                }
                                            }
                                        }
                                    }
                                    >
                                    <div>
                                        <p><FormattedMessage {...messages.accDeletingTitle} /></p>
                                    </div>
                                    <div className="alert alert-warning">
                                        <h4 className="alert-heading"><FormattedMessage {...messages.accDeletingWarning} /></h4>
                                        <b><FormattedMessage {...messages.accDeletingWarningText1} /></b> <span><FormattedMessage {...messages.accDeletingWarningText2} /></span>
                                    </div>

                                    <div className="form-group">
                                        <Recaptcha
                                            ref={(e) => {this.recaptchaInstance = e;}}
                                            sitekey={captchaKey}
                                            onloadCallback={(a) => {
                                                _debug('loaded: ', a);
                                            }}
                                            render="explicit"
                                            verifyCallback={this.recaptchaVerify.bind(this)}
                                            expiredCallback={this.recaptchaExpired.bind(this)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Button
                                            danger
                                            wide
                                            uppercase
                                            stack
                                            tabIndex="1"
                                            disabled={!this.state.isCaptchaVerified}
                                        ><FormattedMessage {...messages.accDeleteConfirm} /></Button>
                                        <Button
                                            white
                                            uppercase
                                            stack
                                            tabIndex="2"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.closeDeleteModal();
                                            }}
                                        ><FormattedMessage {...messages.accDeleteCancel} /></Button>
                                    </div>
                                </Form>
                            )
                        }
                    </div>
                </ModalCommon>

                <ModalCommon
                    showModal={this.state.showDataModal}
                    onHide={() => this.closeDataModal()}
                    className="modal-security"
                >
                    <div className="modal-security__title">
                        <FormattedMessage {...messages.personalDataInfoRequestedHeader} />
                    </div>
                    <div>
                        <p>
                            <FormattedMessage
                                {...messages.personalDataInfoRequested}
                                values={{
                                    email: <span className="link">{this.props.userData.get('Email')}</span>
                                }}
                                />
                        </p>
                    </div>
                </ModalCommon>
            </ProfileWithSidebar>
        );
    }
}

AccountPrivacyPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    AccountPrivacyPage: makeSelectAccountPrivacyPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPrivacyPage);
