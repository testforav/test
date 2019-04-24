/*
 *
 * VerificationDataPage
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

import makeSelectVerificationDataPage from 'core/containers/VerificationDataPage/selectors';

import {
    changeFieldAction,
    setDefaultAction,
    saveAction,
    uploadAction,
} from 'core/containers/VerificationDataPage/actions';

export class VerificationDataPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
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
    componentWillMount() {
        _debug('documents: ', localStorage.getItem('VerificationKycDocuments'));
        const addressArray = this.props.userData.get('Address') ? this.props.userData.get('Address').split(' // ') : [ '', '', ''];
        this.props.dispatch(
            setDefaultAction({
                Gender: localStorage.getItem('VerificationKycGender') ? localStorage.getItem('VerificationKycGender') : this.props.userData.get('Gender'),
                Documents: localStorage.getItem('VerificationKycDocuments') ? JSON.parse(localStorage.getItem('VerificationKycDocuments')) : [
                    {
                        DocumentType: 'front',
                        Document: '',
                        // Document: this.props.userData.get('KycDocumentFront'),
                    }, {
                        DocumentType: 'back',
                        Document: '',
                        // Document: this.props.userData.get('KycDocumentBack'),
                    }, {
                        DocumentType: 'proof',
                        Document: '',
                        // Document: this.props.userData.get('KycDocumentProof'),
                    }, {
                        DocumentType: 'selfie',
                        Document: '',
                        // Document: this.props.userData.get('KycDocumentSelfie'),
                    },
                ],
                FirstName: localStorage.getItem('VerificationKycFirstName') ? localStorage.getItem('VerificationKycFirstName') : this.props.userData.get('FirstName'),
                MiddleName: localStorage.getItem('VerificationKycMiddleName') ? localStorage.getItem('VerificationKycMiddleName') : this.props.userData.get('MiddleName'),
                LastName: localStorage.getItem('VerificationKycLastName') ? localStorage.getItem('VerificationKycLastName') : this.props.userData.get('LastName'),
                Citizenship: localStorage.getItem('VerificationKycCitizenship') ? localStorage.getItem('VerificationKycCitizenship') : this.props.userData.get('Citizenship'),
                Phone: localStorage.getItem('VerificationKycPhone') ? localStorage.getItem('VerificationKycPhone') : this.props.userData.get('Phone'),
                Country: localStorage.getItem('VerificationKycCountry') ? localStorage.getItem('VerificationKycCountry') : this.props.userData.get('Country'),
                State: localStorage.getItem('VerificationKycState') ? localStorage.getItem('VerificationKycState') : this.props.userData.get('State'),
                City: localStorage.getItem('VerificationKycCity') ? localStorage.getItem('VerificationKycCity') : this.props.userData.get('City'),
                Appartments: localStorage.getItem('VerificationKycAppartments') ? localStorage.getItem('VerificationKycAppartments') : addressArray[2],
                Street: localStorage.getItem('VerificationKycStreet') ? localStorage.getItem('VerificationKycStreet') : addressArray[1],
                Postal: localStorage.getItem('VerificationKycPostal') ? localStorage.getItem('VerificationKycPostal') : addressArray[0],
                DocumentNumber: localStorage.getItem('VerificationKycDocumentNumber') ? localStorage.getItem('VerificationKycDocumentNumber') : this.props.userData.get('DocumentNumber'),
            }, this.props.userData.get('KycStatus'))
        );
    }
    changeField(evt) {
        const key = evt.target.name;
        const value = evt.target.value;
        _debug('change field (component): ', key, value);
        this.props.dispatch(changeFieldAction(key, value));

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('VerificationKyc' + key, value);
        }
    }
    
    save() {
        this.props.dispatch(saveAction(this.props.VerificationDataPage.data));
    }
    uploadFile(file, index) {
        _debug('upload start: ', index);
        this.props.dispatch(uploadAction(file, index));
    }
    showUploadError(text) {
        this.props.dispatch(showNotification({
            type: 'danger',
            message: {
                id: text,
                defaultMessage: text,
            },
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
                    title="Verification KYC"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div className={
                    "profile__section"
                    + (this.props.VerificationDataPage.isLoading ? ' block-loading' : '')
                }>
                    <h2 className="profile__section__header">Identity Verification</h2>
                    {(this.props.userData.get('KycStatus') === 'approved')
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
                                        <div className="non-mobile-only">
                                            <b>1. PERSONAL INFO</b>
                                        </div>
                                        <div className="mobile-only">
                                            <b>PERSONAL INFO</b>
                                        </div>
                                    </div>
                                    
                                    <div className={
                                        "verification__badge"
                                        + (this.state.badges.addresses.isActive ? ' verification__badge-active' : '')
                                        + (this.state.badges.addresses.isPassed ? ' verification__badge-passed' : '')
                                    }>
                                        <div className="non-mobile-only">
                                            <b>2. ADDRESSES</b>
                                        </div>
                                        <div className="mobile-only">
                                            <b>ADDRESSES</b>
                                        </div>
                                    </div>

                                    <div className={
                                        "verification__badge"
                                        + (this.state.badges.documents.isActive ? ' verification__badge-active' : '')
                                        + (this.state.badges.documents.isPassed ? ' verification__badge-passed' : '')
                                    }>
                                        <div className="non-mobile-only">
                                            <b>3. PHOTOS OF DOCUMENTS</b>
                                        </div>
                                        <div className="mobile-only">
                                            <b>PHOTOS OF DOCUMENTS</b>
                                        </div>
                                    </div>

                                </div>

                                {
                                    (this.props.VerificationDataPage.isDefaultPassed) ? (
                                        <div>
                                            <div 
                                                className={(this.state.currentScreen === 'personalInfo') ? '' : 'hidden'}
                                            >
                                                <VerificationPersonalInfoScreen
                                                    {... this.props }
                                                    defaultData={this.props.VerificationDataPage.data}
                                                    goForward={
                                                        () => {
                                                            this.goForward('addresses', 'personalInfo');
                                                            window.scrollTo(0, 0);
                                                        }
                                                    }
                                                    changeField={(evt) => this.changeField(evt)}
                                                />
                                            </div>

                                            <div 
                                                className={(this.state.currentScreen === 'addresses') ? '' : 'hidden'}
                                            >
                                                <VerificationAddressesScreen
                                                    {... this.props }
                                                    defaultData={this.props.VerificationDataPage.data}
                                                    disabled={(this.props.userData.get('KycStatus') === 'sent') || (this.props.userData.get('KycStatus') === 'in_work')}
                                                    goForward={
                                                        () => {
                                                            window.scrollTo(0, 0);
                                                            this.goForward('documents', 'addresses');
                                                        }
                                                    }
                                                    goBack={
                                                        (evt) => {
                                                            evt.preventDefault();
                                                            window.scrollTo(0, 0);
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
                                                    defaultData={this.props.VerificationDataPage.data}
                                                    uploadFile={this.uploadFile.bind(this)}
                                                    showUploadError={this.showUploadError.bind(this)}
                                                    goBack={
                                                        (evt) => {
                                                            evt.preventDefault();
                                                            window.scrollTo(0, 0);
                                                            this.goBack('addresses', 'documents');
                                                        }
                                                    }
                                                    submit={
                                                        () => {
                                                            this.save();
                                                            window.scrollTo(0, 0);
                                                        }
                                                    }
                                                    changeField={(evt) => this.changeField(evt)}
                                                />
                                            </div>
                                        </div>
                                    ) : null
                                }

                            </div>
                        )
                    }

                </div>
            </ProfileWithSidebar>
        );
    }
}

VerificationDataPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    VerificationDataPage: makeSelectVerificationDataPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationDataPage);
