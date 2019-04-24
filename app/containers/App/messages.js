/*
 * App Messages
 *
 * This contains all the text for the App component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    unsupported_over_http: {
        id: 'boilerplate.containers.App.unsupported_over_http',
        defaultMessage: 'OAuth 2.0 only supports the calls over https.',
    },
    version_rejected: {
        id: 'boilerplate.containers.App.version_rejected',
        defaultMessage: 'Unsupported version of OAuth is supplied.',
    },
    parameter_absent: {
        id: 'boilerplate.containers.App.parameter_absent',
        defaultMessage: 'Some required parameters missing from the request.',
    },
    parameter_rejected: {
        id: 'boilerplate.containers.App.parameter_rejected',
        defaultMessage: 'Given parameter is too long.',
    },
    invalid_client: {
        id: 'boilerplate.containers.App.invalid_client',
        defaultMessage: 'Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method).',
    },
    invalid_request: {
        id: 'boilerplate.containers.App.invalid_request',
        defaultMessage: 'Invalid request parameter is given.',
    },
    unsupported_response_type: {
        id: 'boilerplate.containers.App.unsupported_response_type',
        defaultMessage: 'Response type provided does not match this particular request.',
    },
    unsupported_grant_type: {
        id: 'boilerplate.containers.App.unsupported_grant_type',
        defaultMessage: 'Grant type is provided that does not match this particular request.',
    },
    invalid_param: {
        id: 'boilerplate.containers.App.invalid_param',
        defaultMessage: 'Invalid request parameter is provided.',
    },
    unauthorized_client: {
        id: 'boilerplate.containers.App.unauthorized_client',
        defaultMessage: 'Invalid client or doesn\'t have the permission to make this request.',
    },
    access_denied: {
        id: 'boilerplate.containers.App.access_denied',
        defaultMessage: 'Unable to authenticate the provided account.',
    },
    server_error: {
        id: 'boilerplate.containers.App.server_error',
        defaultMessage: 'Unexpected server error.',
    },
    token_expired: {
        id: 'boilerplate.containers.App.token_expired',
        defaultMessage: 'Provided token expired.',
    },
    invalid_token: {
        id: 'boilerplate.containers.App.invalid_token',
        defaultMessage: 'Provided token is invalid.',
    },
    invalid_callback: {
        id: 'boilerplate.containers.App.invalid_callback',
        defaultMessage: 'Provided URI with the request does not match the consumer key.',
    },
    invalid_client_secret: {
        id: 'boilerplate.containers.App.invalid_client_secret',
        defaultMessage: 'Provided client secret is invalid.',
    },
    invalid_grant: {
        id: 'boilerplate.containers.App.invalid_grant',
        defaultMessage: 'Provided token has either expired or is invalid.',
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
    sessionErrorHeadline: {
        id: 'app.containers.App.sessionErrorHeadline',
        defaultMessage: 'Session timeout',
    },
    sessionErrorMessage: {
        id: 'app.containers.App.sessionErrorMessage',
        defaultMessage: 'Please relogin',
    },
    serverErrorHeadline: {
        id: 'app.containers.App.serverErrorHeadline',
        defaultMessage: 'Server error',
    },
    serverErrorMessage: {
        id: 'app.containers.App.serverErrorMessage',
        defaultMessage: 'Please resubmit',
    },
});
