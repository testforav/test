/**
*
* ContactUsForm
*
*/

import React from 'react';
// import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Recaptcha from 'react-recaptcha';
import messages from './messages';

import Input from 'components/basic/Input';
import Button from 'components/basic/Button';
import { Form, Textarea } from 'react-validation/lib/build/validation.rc';

import { showNotification, contactUsErrorsShown } from 'core/containers/App/actions';
import { showApiValidateError } from 'utils/helpers';

const captchaKey = process.env.CONFIG.recaptcha;

class ContactUsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            phone: '',
            company: '',
            message: '',
            captcha: '',
            isCaptchaVerified: false,
        };
    }
    showNotification() {
        this.props.dispatch(showNotification({
            type: 'danger',
            headline: messages.notificationHeader,
            message: messages.notificationMessage,
        }));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.formErrors.length) {
            nextProps.formErrors.forEach((error) => {
                if (error.Key === 'Captcha') {
                    this.showNotification();
                } else {
                    this.form && this.form.components[error.Key] && this.form.showError(error.Key, showApiValidateError(error.Message));
                }
            });

            this.props.dispatch(contactUsErrorsShown());
        }
    }

    // Recaptcha
    recaptchaVerify(key) {
        _debug('verifyCallback: ', key);

        this.setState({
            isCaptchaVerified: true,
            captcha: key
        });
    }

    recaptchaExpired() {
        this.setState({
            isCaptchaVerified: false,
            captcha: ''
        });
    }

    render() {
        return (
            <div>
                <h1 className="modal-security__title"><FormattedMessage {...messages.header} /></h1>
                <p className="text-muted modal-security__subtitle">
                    <FormattedMessage {...messages.subheader} />
                </p>
                <Form
                    onSubmit={
                        (evt) => {
                            evt.preventDefault();
                            if (!this.props.isLoading) {
                                if (!this.state.isCaptchaVerified) {
                                    this.showNotification();
                                } else {
                                    this.props.submitContactForm(this.state);
                                }
                            }
                        }
                    }
                    className={
                        'main-page__register'
                        + (this.props.isLoading ? ' block-loading light' : '')
                    }
                    ref={
                        (form) => {
                            this.form = form;
                        }
                       }
                >
                    <div className="form-group">
                        <Input
                            name="Name"
                            id="Name"
                            value={this.state.name}
                            type="text"
                            tabIndex="1"
                            autoFocus={true}
                            onChange={
                                (evt) => {
                                    this.setState({ name: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={['required']}
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.name)}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="Email"
                            id="Email"
                            type="email"
                            tabIndex="2"
                            value={this.state.email}
                            onChange={
                                (evt) => {
                                    this.setState({ email: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={['required']}
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.email)}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="Phone"
                            id="Phone"
                            type="phone"
                            tabIndex="3"
                            value={this.state.phone}
                            onChange={
                                (evt) => {
                                    this.setState({ phone: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={[ 'phone' ]}
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.phone)}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="Company"
                            id="Company"
                            type="text"
                            tabIndex="4"
                            value={this.state.company}
                            onChange={
                                (evt) => {
                                    this.setState({ company: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={[ ]}
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.company)}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            name="Subject"
                            id="Subject"
                            type="text"
                            tabIndex="5"
                            value={this.state.subject}
                            onChange={
                                (evt) => {
                                    this.setState({ subject: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={[ ]}
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.subject)}
                        />
                    </div>
                    <div className="form-group">
                        <Textarea
                            value={this.state.message}
                            onChange={
                                (evt) => {
                                    this.setState({ message: evt.target.value });
                                }
                            }
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            validations={['required']}
                            tabIndex="6"
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.message)}
                        />
                    </div>

                    <div className="form-group">
                        <Recaptcha
                            ref={(e) => {this.recaptchaInstance = e;}}
                            sitekey={captchaKey}
                            onloadCallback={(a) => {
                                _debug('loaded: ', a);
                            }}
                            render="explicit"
                            verifyCallback={this.recaptchaVerify.bind(this)}
                            expiredCallback={this.recaptchaExpired.bind(this)}
                        />
                    </div>

                    <div className="form-group">
                        <Button
                            aqua
                            wide
                            uppercase
                            tabIndex="7"
                        >Confirm</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

ContactUsForm.propTypes = {

};

export default injectIntl(ContactUsForm);
