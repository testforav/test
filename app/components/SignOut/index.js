/**
*
* SignOut
*
*/

import React from 'react';
import { signout } from 'core/containers/App/actions';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';


class SignOut extends React.Component { // eslint-disable-line react/prefer-stateless-function
    renderTextForm() {
        return (
            <span
                className={
                    'signout nav-mobile__list__item__link'
                    + (this.props.globalLoadings.get('signout') ? ' block-loading light' : '')
                }
                onClick={(evt) => {
                    evt.preventDefault();
                    this.props.dispatch(signout());
                }}
            ><FormattedMessage {...messages.signout} /></span>
        );
    }

    renderFullForm() {
        return (
            <form
                className={
                    'header__exit-wrap no-bg-loading'
                    + (this.props.globalLoadings.get('signout') ? ' block-loading light' : '')
                }
                onSubmit={(evt) => {
                    evt.preventDefault();
                    this.props.dispatch(signout());
                }}
                action="/signout"
                method="POST"
            >
                <button className="header__exit">
                    <i className="header__exit__ico ico-exit"></i>
                </button>
            </form>
        );
    }

    render() {
        if (this.props.type === 'text') {
            return this.renderTextForm();
        } else {
            return this.renderFullForm();
        }
    }
}

SignOut.propTypes = {

};

export default SignOut;
