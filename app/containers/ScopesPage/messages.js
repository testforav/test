/*
 * ScopesPage Messages
 *
 * This contains all the text for the ScopesPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'app.containers.ScopesPage.header',
        defaultMessage: 'This is ScopesPage container !',
    },

    consent_modal_text: {
        id: 'boilerplate.containers.App.consent_modal_text',
        defaultMessage: '{company} will receive your information: Date of birth, Email, KYC status',
    },
    consent_modal_confirm: {
        id: 'boilerplate.containers.App.consent_modal_confirm',
        defaultMessage: 'Authorize',
    },
    consent_modal_cancel: {
        id: 'boilerplate.containers.App.consent_modal_cancel',
        defaultMessage: 'Cancel',
    },
});
