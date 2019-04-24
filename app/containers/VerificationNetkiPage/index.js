/*
 *
 * VerificationNetkiPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import VerificationIdTypeScreen from 'components/verification/VerificationIdTypeScreen';
import VerificationPersonalInfoScreen from 'components/verification/VerificationPersonalInfoScreen';
import VerificationAddressesScreen from 'components/verification/VerificationAddressesScreen';
import VerificationDocumentsScreen from 'components/verification/VerificationDocumentsScreen';

import ProfileWithSidebar from 'components/ProfileWithSidebar';
import ModalCommon from 'components/ModalCommon';

import Button from 'components/basic/Button';

import { showNotification } from 'core/containers/App/actions';

import makeSelectVerificationNetkiPage from 'core/containers/VerificationNetkiPage/selectors';

import {
    changeFieldAction,
    saveAction,
    uploadAction,
} from 'core/containers/VerificationNetkiPage/actions';

export class VerificationNetkiPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            currentScreen: 'personalInfo',
            badges: {
                personalInfo: {
                    isActive: true,
                    isPassed: false,
                },
                addresses: {
                    isActive: false,
                    isPassed: false,
                },
                documents: {
                    isActive: false,
                    isPassed: false,
                },
            },
        };
    }
    changeField(evt) {
        const key = evt.target.name;
        const value = evt.target.value;
        this.props.dispatch(changeFieldAction(key, value));
    }
    save() {
        this.props.dispatch(saveAction(this.props.VerificationNetkiPage.data));
    }
    uploadFile(file, index) {
        _debug('upload start: ', index);
        this.props.dispatch(uploadAction(file, index));
    }
    showUploadError(text) {
        this.props.dispatch(showNotification({
            type: 'danger',
            message: text,
            timeout: 500,
        }));
    }
    goForward(toScreen, fromScreen) {
        const badges = this.state.badges;

        badges[fromScreen].isPassed = true;
        badges[fromScreen].isActive = false;
        badges[toScreen].isActive = true;

        this.setState({
            currentScreen: toScreen,
            badges: badges,
        });        
    }
    goBack(toScreen, fromScreen) {
        const badges = this.state.badges;

        badges[toScreen].isPassed = false;
        badges[toScreen].isActive = true;
        badges[fromScreen].isActive = false;

        this.setState({
            currentScreen: toScreen,
            badges: badges,
        });          
    }
    render() {
        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Verification Netki"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div className={
                    "profile__section"
                    + (this.props.VerificationNetkiPage.isLoading ? ' block-loading' : '')
                }>
                    <h2 className="profile__section__header">Identity Verification</h2>
                    {this.props.userData.get('GlobalidVerify')
                        ? (
                            <p className="form-group form-group_section text-secondary">
                                Your account is successfully verified!
                            </p>
                        )
                        : (
                            <div>
                                <p className="form-group form-group_section text-secondary">
                                    Complete verification to unlock account opportunities. Verification procedure is very simple and intuitive. We will only ask you to provide us some personal information and supporting documents.
                                </p>

                                <div className="verification__badges">

                                    <div className={
                                        "verification__badge"
                                        + (this.state.badges.personalInfo.isActive ? ' verification__badge-active' : '')
                                        + (this.state.badges.personalInfo.isPassed ? ' verification__badge-passed' : '')
                                    }>
                                        <b>1. PERSONAL INFO</b>
                                    </div>
                                    
                                    <div className={
                                        "verification__badge"
                                        + (this.state.badges.addresses.isActive ? ' verification__badge-active' : '')
                                        + (this.state.badges.addresses.isPassed ? ' verification__badge-passed' : '')
                                    }>
                                        <b>2. ADDRESSES</b>
                                    </div>

                                    <div className={
                                        "verification__badge"
                                        + (this.state.badges.documents.isActive ? ' verification__badge-active' : '')
                                        + (this.state.badges.documents.isPassed ? ' verification__badge-passed' : '')
                                    }>
                                        <b>3. PHOTOS OF DOCUMENTS</b>
                                    </div>

                                </div>

                                <div 
                                    className={(this.state.currentScreen === 'personalInfo') ? '' : 'hidden'}
                                >
                                    <VerificationPersonalInfoScreen
                                        {... this.props }
                                        goForward={() => this.goForward('addresses', 'personalInfo')}
                                        changeField={(evt) => this.changeField(evt)}
                                    />
                                </div>

                                <div 
                                    className={(this.state.currentScreen === 'addresses') ? '' : 'hidden'}
                                >
                                    <VerificationAddressesScreen
                                        {... this.props }
                                        goForward={() => this.goForward('documents', 'addresses')}
                                        goBack={
                                            (evt) => {
                                                evt.preventDefault();
                                                this.goBack('personalInfo', 'addresses');
                                            }
                                        }
                                        changeField={(evt) => this.changeField(evt)}
                                    />
                                </div>

                                <div 
                                    className={(this.state.currentScreen === 'documents') ? '' : 'hidden'}
                                >
                                    <VerificationDocumentsScreen
                                        {... this.props }
                                        uploadFile={this.uploadFile.bind(this)}
                                        showUploadError={this.showUploadError.bind(this)}
                                        goBack={
                                            (evt) => {
                                                evt.preventDefault();
                                                this.goBack('addresses', 'documents');
                                            }
                                        }
                                        submit={
                                            () => {
                                                this.save();
                                            }
                                        }
                                        changeField={(evt) => this.changeField(evt)}
                                    />
                                </div>

                            </div>
                        )
                    }

                </div>
            </ProfileWithSidebar>
        );
    }
}

VerificationNetkiPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    VerificationNetkiPage: makeSelectVerificationNetkiPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationNetkiPage);
