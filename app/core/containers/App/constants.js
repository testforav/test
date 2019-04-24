/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const LOAD_USER = 'boilerplate/App/LOAD_USER';
export const LOAD_USER_SUCCESS = 'boilerplate/App/LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'boilerplate/App/LOAD_USER_ERROR';

export const LOAD_WALLETS = 'boilerplate/App/LOAD_WALLETS';
export const CHANGE_WALLETS = 'boilerplate/App/CHANGE_WALLETS';
export const LOAD_WALLETS_SUCCESS = 'boilerplate/App/LOAD_WALLETS_SUCCESS';
export const LOAD_WALLETS_ERROR = 'boilerplate/App/LOAD_WALLETS_ERROR';

export const SIGNOUT = 'boilerplate/App/SIGNOUT';
export const SIGNOUT_SUCCESS = 'boilerplate/App/SIGNOUT_SUCCESS';
export const SIGNOUT_ERROR = 'boilerplate/App/SIGNOUT_ERROR';
export const AJAX_ERROR = 'boilerplate/App/AJAX_ERROR';

export const RESET_DEFAULTS = 'boilerplate/App/RESET_DEFAULTS';
export const HARD_RESET_DEFAULTS = 'boilerplate/App/HARD_RESET_DEFAULTS';

export const NOTIFICATION_SHOW = 'boilerplate/App/NOTIFICATION_SHOW';
export const NOTIFICATION_HIDE = 'boilerplate/App/NOTIFICATION_HIDE';

export const HOT_GET = 'app/App/HOT_GET';
export const HOT_GET_SUCCESS = 'app/App/HOT_GET_SUCCESS';
export const HOT_GET_ERROR = 'app/App/HOT_GET_ERROR';

export const TOTAL_RECEIVE_GET = 'app/App/TOTAL_RECEIVE_GET';
export const TOTAL_RECEIVE_GET_SUCCESS = 'app/App/TOTAL_RECEIVE_GET_SUCCESS';
export const TOTAL_RECEIVE_GET_ERROR = 'app/App/TOTAL_RECEIVE_GET_ERROR';

export const SEND_CONSENT = 'app/App/SEND_CONSENT';
export const SEND_CONSENT_SUCCESS = 'app/App/SEND_CONSENT_SUCCESS';
export const SEND_CONSENT_ERROR = 'app/App/SEND_CONSENT_ERROR';

export const CHECK_CONSENT = 'app/App/CHECK_CONSENT';
export const CHECK_CONSENT_SUCCESS = 'app/App/CHECK_CONSENT_SUCCESS';
export const CHECK_CONSENT_ERROR = 'app/App/CHECK_CONSENT_ERROR';
export const CHECK_CONSENT_RESET = 'app/App/CHECK_CONSENT_RESET';
export const CHECK_CONSENT_RESET_SCOPES = 'app/App/CHECK_CONSENT_RESET_SCOPES';

export const OPEN_CONTACT_US = 'app/App/OPEN_CONTACT_US';
export const CLOSE_CONTACT_US = 'app/App/CLOSE_CONTACT_US';
export const CONTACT_US_ERRORS_SHOWN = 'app/App/CONTACT_US_ERRORS_SHOWN';

export const SEND_CONTACT_US = 'app/App/SEND_CONTACT_US';
export const SEND_CONTACT_US_SUCCESS = 'app/App/SEND_CONTACT_US_SUCCESS';
export const SEND_CONTACT_US_ERROR = 'app/App/SEND_CONTACT_US_ERROR';

export const SET_CONSENT = 'app/App/SET_CONSENT';

export const FORM_SUBMIT = 'app/App/FORM_SUBMIT';

export const CLEAN_USER = 'app/App/CLEAN_USER';
