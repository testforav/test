/*
 *
 * VerificationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    CHANGE_FIELD_ACTION,

    SET_DEFAULT_ACTION,

    SAVE_SUCCESS_ACTION,
    SAVE_ERROR_ACTION,
    SAVE_ACTION,

    UPLOAD_SUCCESS_ACTION,
    UPLOAD_ERROR_ACTION,
    UPLOAD_ACTION,
} from './constants';

import {
    LOAD_USER_SUCCESS,
    SIGNOUT_SUCCESS,
} from 'core/containers/App/constants';

const initialState = fromJS({
    data: {
        Documents: [
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
    },
    isDefaultPassed: false,
    isLoading: false,
    status: '',
});

function verificationDataPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case CHANGE_FIELD_ACTION:
            _debug('change field (reducer): ', action.key, action.value);
            return state
                .setIn(['data', action.key], action.value);

        case SET_DEFAULT_ACTION:
            _debug('set verification default: ', action.data);
            return state 
                .set('data', fromJS(action.data))
                .set('status', action.status)
                .set('isDefaultPassed', true);

        case SAVE_ACTION:
            return state
                .set('isLoading', true);
        case SAVE_ERROR_ACTION:
            return state
                .set('isLoading', false);
        case SAVE_SUCCESS_ACTION:
            localStorage.setItem('VerificationKycDocuments', '');
            return state
                .set('isLoading', false);

        case UPLOAD_ACTION:
            return state
                .set('isLoading', true);
        case UPLOAD_ERROR_ACTION:
            return state
                .set('isLoading', false);
        case UPLOAD_SUCCESS_ACTION:
            const docs = state.get('data').toJS().Documents;
            let isExist = false;

            for (let i = 0, l = docs.length; i < l; i++) {
                if (docs[i].DocumentType === action.index) {
                    docs[i].Document = action.data.Result.File;
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                docs.push({
                    Document: action.data.Result.File,
                    DocumentType: action.index,
                });
            }

            localStorage.setItem('VerificationKycDocuments', JSON.stringify(docs));

            return state
                .set('isLoading', false)
                .setIn(['data', 'Documents'], docs);

        case SIGNOUT_SUCCESS:
            localStorage.setItem('VerificationKycDocuments', '');
            localStorage.setItem('VerificationKycGender', '');
            localStorage.setItem('VerificationKycFirstName', '');
            localStorage.setItem('VerificationKycMiddleName', '');
            localStorage.setItem('VerificationKycLastName', '');
            localStorage.setItem('VerificationKycCitizenship', '');
            localStorage.setItem('VerificationKycPhone', '');
            localStorage.setItem('VerificationKycCountry', '');
            localStorage.setItem('VerificationKycState', '');
            localStorage.setItem('VerificationKycCity', '');
            localStorage.setItem('VerificationKycAppartments', '');
            localStorage.setItem('VerificationKycStreet', '');
            localStorage.setItem('VerificationKycPostal', '');
            localStorage.setItem('VerificationKycDocumentNumber', '');

            return state
                .set('data', initialState.get('data'))
                .set('status', initialState.get('status'));

        case LOAD_USER_SUCCESS:
            const clientDataUpdated = _.extend({}, action.data.Client, action.data.Session);

            _debug('reducer verification LOAD_USER_SUCCESS: ', clientDataUpdated);

            if ((clientDataUpdated.KycStatus !== state.get('status')) && (clientDataUpdated.KycStatus === 'disapproved')) {
                localStorage.setItem('VerificationKycDocuments', '');
                return state
                    .setIn(['data', 'Documents'], [
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
                    ]).set('status', clientDataUpdated.KycStatus);
            } else {
                return state;
            } 

        default:
            return state;
    }
}

export default verificationDataPageReducer;
