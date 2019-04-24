/**
*
* ForgotPasswordForm
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
import InputRound from 'components/form/InputRound';
import { required, email } from 'utils/validators';

class ForgotPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="main__form">
                <form
                    className={
                        'main-page__register'
                        + (this.props.submitting ? ' block-loading light' : '')
                    }
                    onSubmit={ this.props.handleSubmit }
                >

                    <div className="form-group">
                        <Field
                            className="form-control"
                            type="email"
                            id="Email"
                            placeholder={this.props.intl.formatMessage(messages.email)}
                            name="Email"
                            autoFocus={true}
                            tabIndex="1"
                            label={(<FormattedMessage {...messages.email} />)}
                            component={InputRound}
                            validate={[ required, email ]}
                        />
                    </div>
                    <div className="form-group">
                        <Button
                            uppercase
                            rounded
                            bold
                            gradient
                            block
                            formSubmit
                            tabIndex="3"
                        >
                            <FormattedMessage {...messages.send} />
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);

export default injectIntl(withReduxForm);
