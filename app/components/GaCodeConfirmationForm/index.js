/**
*
* MainCodeConfirmation
*
*/

import React from 'react';
// import styled from 'styled-components';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

// redux-form components
import { Field, reduxForm } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import { required } from 'utils/validators';

class GaCodeConfirmationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
                        <label className="main__form__label" htmlFor="G2fatkn">
                            <FormattedMessage {...messages.header}/>
                        </label>
                        <Field
                            className="form-control"
                            placeholder={this.props.intl.formatMessage(messages.header)}
                            id="G2fatkn"
                            name="G2fatkn"
                            tabIndex="1"
                            autoFocus={true}
                            component={Input}
                            validate={[ required ]}
                        />
                    </div>

                    <Field
                        type="hidden"
                        disabled={true}
                        id="Consent"
                        name="Consent"
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
                        ><FormattedMessage {...messages.signin} /></Button>
                    </div>
                </form>
            </div>
        );
    }
}

GaCodeConfirmationForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'gaConfirmSignIn'
})(GaCodeConfirmationForm);

export default injectIntl(withReduxForm);
