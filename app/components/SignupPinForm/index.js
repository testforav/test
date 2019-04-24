/**
*
* SignupPinForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

// redux-form components
import { Field, reduxForm } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import { required } from 'utils/validators';

class SignupPinForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            isEmailResended: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.SignupPage.emailResended && (this.props.SignupPage.emailResended !== nextProps.SignupPage.emailResended)) {
            this.setState({
                isEmailResended: true,
            });
        }
    }

    resendEmail(e) {
        e.preventDefault();
        this.props.resendEmail(this.props.SignupPage.token);
    }
    render() {
        return (
            <div className="main__form">
                <form
                    className={
                        'signup__form'
                        + (this.props.submitting ? ' block-loading light' : '')
                    }
                    action="/"
                    onSubmit={ this.props.handleSubmit }
                >
                    <div className="form-group">
                        <div className="text-center">
                            <FormattedMessage {...messages.info} />
                        </div>
                    </div>
                    <div className="form-group form-control-wrap form-group_section">
                        <Field
                            className="form-control"
                            type="text"
                            id="Pin"
                            placeholder="Pin"
                            name="Pin"
                            tabIndex="1"
                            component={Input}
                            validate={[ required ]}
                        />
                    </div>

                    <Field
                        className="form-control"
                        type="hidden"
                        disabled={true}
                        id="Consent"
                        name="Consent"
                        component={Input}
                    />
                    <Field
                        className="form-control"
                        type="hidden"
                        disabled={true}
                        id="Token"
                        name="Token"
                        component={Input}
                    />

                    <div className="form-group text-center">
                        <Button
                            uppercase
                            rounded
                            bold
                            gradient
                            block
                            formSubmit
                            tabIndex="2"
                        >
                            <FormattedMessage {...messages.send} />
                        </Button>
                    </div>
                    <div className="form-group">
                        {(this.state.isEmailResended) ? (
                            <div className="text-hint text-muted text-center">
                                <FormattedMessage {...messages.resended} />
                            </div>
                        ) : (
                            <div className="text-hint text-muted text-center">
                                <FormattedMessage
                                    {...messages.resend}
                                    values={
                                        {
                                            link: <a
                                                    href="#"
                                                    onClick={
                                                        (e) => this.resendEmail(e)
                                                    }
                                                ><FormattedMessage {...messages.linkmsg} /></a>,
                                            br: <br/>
                                        }
                                    }
                                    />
                            </div>
                        )}

                    </div>
                </form>
            </div>
        );
    }
}

SignupPinForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'signUpPin'
})(SignupPinForm);

export default injectIntl(withReduxForm);
