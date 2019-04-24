/**
*
* Captcha
*
*/

import React from 'react';
// import styled from 'styled-components';
import Recaptcha from 'react-recaptcha';

import messages from './messages';
import { showNotification } from 'core/containers/App/actions';

const captchaKey = process.env.CONFIG.recaptcha;

class Captcha extends React.Component { // eslint-disable-line react/prefer-stateless-function
    // Recaptcha
    recaptchaVerify(key) {
        _debug('verifyCallback: ', key);
        this.props.input.onChange(key);
    }
    recaptchaExpired() {
        _debug('expired!: ');
        this.props.input.onChange('');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.meta.error && nextProps.meta.touched && !nextProps.input.value && (nextProps.meta.error !== this.props.meta.error)) {
            this.props.meta.dispatch(
                showNotification({
                    type: 'danger',
                    headline: messages.notificationCaptchaHeader,
                    message: messages.notificationCaptchaMessage,
                })
            );  
        }
    }
    render() {
        return (
            <div>
                <Recaptcha
                    ref={ this.props.captchaRef }
                    sitekey={ captchaKey }
                    onloadCallback={
                        (a) => {
                            _debug('loaded: ', a);
                        }
                    }
                    render="explicit"
                    verifyCallback={this.recaptchaVerify.bind(this)}
                    expiredCallback={this.recaptchaExpired.bind(this)}
                />
            </div>
        );
    }
}

Captcha.propTypes = {

};

export default Captcha;
