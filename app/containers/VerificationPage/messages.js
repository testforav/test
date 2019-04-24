/*
 * VerificationPage Messages
 *
 * This contains all the text for the VerificationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'boilerplate.containers.VerificationPage.header',
        defaultMessage: 'Verification',
    },
    subHeader: {
        id: 'boilerplate.containers.VerificationPage.subHeader',
        defaultMessage: 'You should obtain two levels of verification: KYC and Proof of Residence. For each subsequent level can not go without passing the previous levels.',
    },
    kycHeader: {
        id: 'boilerplate.containers.VerificationPage.kycHeader',
        defaultMessage: 'KYC',
    },
    successMessage: {
        id: 'boilerplate.containers.VerificationPage.successMessage',
        defaultMessage: 'Your account is successfully verified!',
    },
    unverifiedMessage: {
        id: 'boilerplate.containers.VerificationPage.unverifiedMessage',
        defaultMessage: 'Complete verification to unlock account opportunities. Verification procedure is very simple and intuitive. We will only ask you to provide us some personal information and supporting documents.',
    },
    waitingMessage: {
        id: 'boilerplate.containers.VerificationPage.waitingMessage',
        defaultMessage: 'Your account is waiting for verification!',
    },
    waitingSubmessage: {
        id: 'boilerplate.containers.VerificationPage.waitingSubmessage',
        defaultMessage: 'Verification takes from 15 minutes to 24 hours. If you have any questions, please contact',
    },
    waitingSupport: {
        id: 'boilerplate.containers.VerificationPage.waitingSupport',
        defaultMessage: 'technical support',
    },
    personalInfoTitle: {
        id: 'boilerplate.containers.VerificationPage.personalInfoTitle',
        defaultMessage: 'PERSONAL INFO',
    },
    addressTitle: {
        id: 'boilerplate.containers.VerificationPage.addressTitle',
        defaultMessage: 'ADDRESS',
    },
    proofTitle: {
        id: 'boilerplate.containers.VerificationPage.proofTitle',
        defaultMessage: 'PHOTOS OF DOCUMENTS',
    },
    backButton: {
        id: 'boilerplate.containers.VerificationPage.backButton',
        defaultMessage: 'Back',
    },
    cancelButton: {
        id: 'boilerplate.containers.VerificationPage.cancelButton',
        defaultMessage: 'Cancel',
    },
    nextStepButton: {
        id: 'boilerplate.containers.VerificationPage.nextStepButton',
        defaultMessage: 'Next Step',
    },
    documentTypeLabel: {
        id: 'boilerplate.containers.VerificationPage.documentTypeLabel',
        defaultMessage: 'Document Type',
    },
    documentCountryLabel: {
        id: 'boilerplate.containers.VerificationPage.documentCountryLabel',
        defaultMessage: 'Document Country',
    },
    documentNumberLabel: {
        id: 'boilerplate.containers.VerificationPage.documentNumberLabel',
        defaultMessage: 'Document Number',
    },
    phoneLabel: {
        id: 'boilerplate.containers.VerificationPage.phoneLabel',
        defaultMessage: 'Phone',
    },
    nationalityLabel: {
        id: 'boilerplate.containers.VerificationPage.nationalityLabel',
        defaultMessage: 'Nationality',
    },
    dobLabel: {
        id: 'boilerplate.containers.VerificationPage.dobLabel',
        defaultMessage: 'Date of Birth',
    },
    firstNameLabel: {
        id: 'boilerplate.containers.VerificationPage.firstNameLabel',
        defaultMessage: 'First Name',
    },
    lastNameLabel: {
        id: 'boilerplate.containers.VerificationPage.lastNameLabel',
        defaultMessage: 'Last Name',
    },
    middleNameLabel: {
        id: 'boilerplate.containers.VerificationPage.middleNameLabel',
        defaultMessage: 'Middle Name',
    },
    genderLabel: {
        id: 'boilerplate.containers.VerificationPage.genderLabel',
        defaultMessage: 'Gender',
    },
    maleGenderLabel: {
        id: 'boilerplate.containers.VerificationPage.maleGenderLabel',
        defaultMessage: 'Male',
    },
    femaleGenderLabel: {
        id: 'boilerplate.containers.VerificationPage.femaleGenderLabel',
        defaultMessage: 'Female',
    },
    otherGenderLabel: {
        id: 'boilerplate.containers.VerificationPage.otherGenderLabel',
        defaultMessage: 'Not specified',
    },
    passportDocumentType: {
        id: 'boilerplate.containers.VerificationPage.passportDocumentType',
        defaultMessage: 'Passport',
    },
    drivingLicenceDocumentType: {
        id: 'boilerplate.containers.VerificationPage.drivingLicenceDocumentType',
        defaultMessage: 'Driving Licence',
    },
    nationalIdDocumentType: {
        id: 'boilerplate.containers.VerificationPage.nationalIdDocumentType',
        defaultMessage: 'National ID Card',
    },
    countryLabel: {
        id: 'boilerplate.containers.VerificationPage.countryLabel',
        defaultMessage: 'Country',
    },
    stateLabel: {
        id: 'boilerplate.containers.VerificationPage.stateLabel',
        defaultMessage: 'State / Province',
    },
    cityLabel: {
        id: 'boilerplate.containers.VerificationPage.cityLabel',
        defaultMessage: 'City',
    },
    addressLabel: {
        id: 'boilerplate.containers.VerificationPage.addressLabel',
        defaultMessage: 'Address Line (Address, App / Suite, ZIP code)',
    },
    onfidoWelcomeTitle: {
        id: 'boilerplate.containers.VerificationPage.onfidoWelcomeTitle',
        defaultMessage: 'Please verify your identity.',
    },
    onfidoWebcamError: {
        id: 'boilerplate.containers.VerificationPage.onfidoWebcamError',
        defaultMessage: 'It seems your webcamera is disabled by the browser setting or isn\'t connected',
    },
    onfidoBrowserError: {
        id: 'boilerplate.containers.VerificationPage.onfidoBrowserError',
        defaultMessage: 'Your browser doesn\'t support webcam usage',
    },
    verificationWarning: {
        id: 'boilerplate.containers.VerificationPage.verificationWarning',
        defaultMessage: 'If you provide fake or incorrect documents, we can block your account without any explanation.',
    },
    onfidoErrorMessage: {
        id: 'boilerplate.containers.VerificationPage.onfidoErrorMessage',
        defaultMessage: 'Error. Please, refresh the page and pass it again',
    },
    onfidoProgressMessage: {
        id: 'boilerplate.containers.VerificationPage.onfidoProgressMessage',
        defaultMessage: 'Your verification in progress',
    },
    poaTitle: {
        id: 'boilerplate.containers.VerificationPage.poaTitle',
        defaultMessage: 'Proof of Residence',
    },
    poaTitleShort: {
        id: 'boilerplate.containers.VerificationPage.poaTitleShort',
        defaultMessage: 'PoR',
    },
    poaShowMore: {
        id: 'boilerplate.containers.VerificationPage.poaShowMore',
        defaultMessage: 'Show Details',
    },
    poaDescriptionFull: {
        id: 'boilerplate.containers.VerificationPage.poaDescriptionFull',
        defaultMessage: 'The document to prove your place of residence must have been issued by a government authority, utility company or financial institution. It must include the following information: Your first name and surname, your current address, a date (e. g. issue date, creation date or period of validity etc.) as well as a unique reference number, such as an account number, invoice number or customer number. Accepted documents: Utility bill (NOT mobile phone, satellite/cable TV or printed Internet bills); Electricity bill; Bank statement; Tax return, council tax; Other documents, with an exception of electronic bills/statements, online screenshots, mobile phone bills or credit card statements.',
    },
    poaDescription: {
        id: 'boilerplate.containers.VerificationPage.poaDescription',
        defaultMessage: 'The document to prove your place of residence must have been issued...',
    },
    uploadSuccess: {
        id: 'boilerplate.containers.VerificationPage.uploadSuccess',
        defaultMessage: 'Upload success',
    },
    uploadError: {
        id: 'boilerplate.containers.VerificationPage.uploadError',
        defaultMessage: 'Upload error. Please, re-upload your file',
    },
    submit: {
        id: 'boilerplate.containers.VerificationPage.submit',
        defaultMessage: 'Submit',
    },
    tier: {
        id: 'boilerplate.containers.VerificationPage.tier',
        defaultMessage: 'Tier {num}',
    },
    docPhoto: {
        id: 'boilerplate.containers.VerificationPage.docPhoto',
        defaultMessage: 'Document photo',
    },
    docSelfieWithDoc: {
        id: 'boilerplate.containers.VerificationPage.docSelfieWithDoc',
        defaultMessage: 'Selfie with document',
    },
    docBill: {
        id: 'boilerplate.containers.VerificationPage.docBill',
        defaultMessage: 'Bill photo',
    },
});
