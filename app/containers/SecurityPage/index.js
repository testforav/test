/*
 *
 * SecurityPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import { fromJS } from 'immutable';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import { createStructuredSelector } from 'reselect';
import makeSelectSecurityPage from 'core/containers/SecurityPage/selectors';
import {
    submitSecurityPage,
    changeSecurityPageCode,
    submitSecurityDisableGooglePage,
    loadActivity,
    terminateSessions,
    loadBackupCodes,
    updateBackupCodes,
    clearBackupCodes,
} from 'core/containers/SecurityPage/actions';

import ProfileWithSidebar from 'components/ProfileWithSidebar';
import ModalCommon from 'components/ModalCommon';
import ModalConfirm from 'components/ModalConfirm';

import SecurityPageForm from 'components/securitypage/SecurityPageForm';
import SecurityPageDisableGoogleForm from 'components/securitypage/SecurityPageDisableGoogleForm';

export class SecurityPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            gaEnableModalOpen: false,
            gaDisableModalOpen: false,
            backupModalOpen: false,
            updateModalOpen: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.SecurityPage.externalCloseModal && (this.props.SecurityPage.externalCloseModal !== nextProps.SecurityPage.externalCloseModal)) {
            this.setState({
                gaEnableModalOpen: false,
                gaDisableModalOpen: false,
                backupModalOpen: false,
                updateModalOpen: false,
            });
        }
    }
    onSubmit(evt) {
        evt.preventDefault();
        this.props.dispatch(submitSecurityPage(this.props.SecurityPage.code, this.props.SecurityPage.qrSecret));
    }
    onSubmitDisableGoogle(evt) {
        evt.preventDefault();
        this.props.dispatch(submitSecurityDisableGooglePage(this.props.SecurityPage.code));
    }
    openEnableGaModal(evt) {
        evt.preventDefault();
        this.setState({
            gaEnableModalOpen: true,
        });
    }
    closeEnableGaModal() {
        this.setState({
            gaEnableModalOpen: false,
        });
    }
    openDisableGaModal(evt) {
        evt.preventDefault();
        this.setState({
            gaDisableModalOpen: true,
        });
    }
    closeDisableGaModal() {
        this.setState({
            gaDisableModalOpen: false,
        });
    }
    openBackupCodes() {
        this.setState({
            backupModalOpen: true,
        });
    }
    closeBackupCodes() {
        this.setState({
            backupModalOpen: false,
        });
    }
    openUpdateConfirm() {
        this.setState({
            updateModalOpen: true,
        });
    }
    closeUpdateConfirm() {
        this.setState({
            updateModalOpen: false,
        });
    }
    terminateSessions(e) {
        e.preventDefault();
        this.props.dispatch(terminateSessions());
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.dispatch(loadActivity());
    }
    render() {
        _debug('security codes: ', fromJS(this.props.SecurityPage.backupCodes));

        const backupCodesContent = fromJS(this.props.SecurityPage.backupCodes).map((code, i) => (
            <div className="security__code" key={i}>
                {code.get('Code')}
            </div>
        ));

        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Security"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div className={
                    "profile__section"
                    + (this.props.SecurityPage.isLoading ? ' block-loading' : '')
                }>
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>
                    <p className="form-group form-group_section text-secondary">
                        <FormattedMessage {...messages.subheader} />
                    </p>
                    <div className="row">
                        <div className="col-xs-15 col-md-5 col-lg-5 col-xl-5">
                            <FormattedMessage {...messages.title2fa} />
                        </div>
                        <div className="col-xs-10 col-md-5 col-lg-5 col-xl-5">
                            <b><FormattedMessage {...messages.titlegoole} /></b>
                        </div>
                        <div className="col-xs-5 col-md-5 col-lg-5 col-xl-5 text-right">
                            {
                                (this.props.userData.get('UseG2fa')) ? (
                                    <div>
                                        <div>
                                            <span
                                                className="link unstyled"
                                                onClick={
                                                    () => {
                                                        this.openBackupCodes();
                                                    }
                                                }
                                            ><FormattedMessage {...messages.backupcodes} /></span>
                                        </div>
                                        <div>
                                            <a className="unstyled" href="#" onClick={(evt) => this.openDisableGaModal(evt)}><FormattedMessage {...messages.disable} /></a>
                                        </div>
                                    </div>
                                ) : (
                                    <a className="unstyled" href="#" onClick={(evt) => this.openEnableGaModal(evt)}><FormattedMessage {...messages.enable} /></a>
                                )
                            }
                        </div>
                    </div>

                    {
                        (this.props.SecurityPage.activityHistory.length !== 0) ? (
                            <div>
                                <hr />

                                <h2 className="profile__section__header"><FormattedMessage {...messages.latestact} /></h2>
                                <p className="form-group form-group_section text-secondary">
                                    <FormattedMessage {...messages.latestactdescr} />
                                </p>
                                <table className="table table-striped activity__table">
                                    <thead>
                                        <tr>
                                            <th className=" activity__device">
                                                <div className="non-mobile-only"><FormattedMessage {...messages.devicetype} /></div>
                                                <div className="mobile-only"><FormattedMessage {...messages.devicetypeip} /></div>
                                            </th>
                                            <th className="activity__used__at"><FormattedMessage {...messages.lastusedat} /></th>
                                            <th className="activity__ip"><FormattedMessage {...messages.ipaddress} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.SecurityPage.activityHistory.map((record, i) => (
                                                <tr key={i}>
                                                    <td className="text-left activity__device" title={ record.Device }>
                                                        <div className="text-overflow non-mobile-only">{ record.Device }</div>
                                                        <div className="text-overflow mobile-only">{ record.Device } <br /> { record.Ip }</div>
                                                    </td>
                                                    <td className="text-left activity__used__at">{ moment(record.LastAccessAt).format('DD.MM.YYYY hh:mm:ss') }</td>
                                                    <td className="text-left activity__ip">{ record.Ip }</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <i />
                        )
                    }

                </div>

                <ModalCommon
                    showModal={this.state.gaEnableModalOpen}
                    onHide={() => this.closeEnableGaModal()}
                    className="modal-security"
                >
                    <h1 className="modal-security__title"><FormattedMessage {...messages.gasettings} /></h1>
                    <p>
                        <FormattedMessage
                            {...messages.gahelp}
                            values={{
                                googlesupport: <a href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DAndroid&oco=0" target="_blank">Google Support Page</a>,
                                androidlink: <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">Android Download</a>,
                                chromeplugin: <a href="https://chrome.google.com/webstore/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai?hl=en" target="_blank">Google Chrome Plugin</a>,
                                appstore: <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank">iTunes App Store</a>
                            }}
                            />
                    </p>
                    <p>
                        <FormattedMessage {...messages.gahelp2} />
                    </p>
                    <SecurityPageForm
                        onSubmit={(evt) => this.onSubmit(evt)}
                        {...this.props}
                    />
                </ModalCommon>

                <ModalCommon
                    showModal={this.state.backupModalOpen}
                    onHide={() => this.closeBackupCodes()}
                    onEntered={() => {
                        this.props.dispatch(loadBackupCodes());
                    }}
                    className="modal-security"
                >
                    <h1 className="modal-security__title"><FormattedMessage {...messages.backupcodes} /></h1>

                    <div>
                        <p>
                            <FormattedMessage {...messages.backupcodeshint1} />
                        </p>
                        <p>
                            <FormattedMessage {...messages.backupcodeshint2} values={{
                                    safeplace: <b><FormattedMessage {...messages.backupcodeshint2safeplace} /></b>
                                }} />
                        </p>
                    </div>

                    <div
                        className={
                            "security__codes article"
                            + (this.props.SecurityPage.backupCodes.length ? '' : ' block-loading')
                        }
                        >
                        { backupCodesContent }
                    </div>

                    <div className="article">
                        <span
                            className="link unstyled"
                            onClick={
                                () => {
                                    //this.props.dispatch(updateBackupCodes());
                                    this.openUpdateConfirm();
                                }
                            }
                            ><FormattedMessage {...messages.newcodes} /></span>
                    </div>
                </ModalCommon>

                <ModalCommon
                    showModal={this.state.gaDisableModalOpen}
                    onHide={() => this.closeDisableGaModal()}
                    className="modal-security"
                >
                    <SecurityPageDisableGoogleForm
                        onSubmit={(evt) => this.onSubmitDisableGoogle(evt)}
                        {...this.props}
                    />
                </ModalCommon>

                <ModalConfirm
                    showModal={this.state.updateModalOpen}
                    onHide={() => this.closeUpdateConfirm()}
                    onConfirm={() => {
                        this.props.dispatch(clearBackupCodes());
                        this.props.dispatch(updateBackupCodes());
                        this.closeUpdateConfirm();
                    }}
                    onCancel={() => this.closeUpdateConfirm()}
                    className="modal-confirm"
                    cancelText="Cancel"
                    confirmText="Continue"
                >
                    <h2 className="modal-confirm__title"><FormattedMessage {...messages.sure} /></h2>
                    <p className="modal-confirm__text">
                        <FormattedMessage {...messages.invalid} />
                    </p>
                </ModalConfirm>

            </ProfileWithSidebar>
        );
    }
}

SecurityPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    SecurityPage: makeSelectSecurityPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,

        onChangeCode: (evt) => dispatch(changeSecurityPageCode(evt.target.value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPage);
