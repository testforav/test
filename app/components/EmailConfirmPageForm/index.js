/**
*
* EmailConfirmPage
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
import InputRound from 'components/form/InputRound';
import Password from 'components/form/Password';
import Captcha from 'components/form/Captcha';
import { required } from 'utils/validators';

class EmailConfirmPageForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
                    <div className="form-group form-control-wrap form-group_section">
                        <Field
                            className="form-control"
                            type="text"
                            id="Pin"
                            placeholder={this.props.intl.formatMessage(messages.code)}
                            name="Pin"
                            autoFocus={true}
                            tabIndex="1"
                            label={(<FormattedMessage {...messages.code} />)}
                            component={InputRound}
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

                    <Field
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
                        ><FormattedMessage {...messages.send} /></Button>
                    </div>
                </form>
            </div>
        );
    }
}

EmailConfirmPageForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'emailConfirm'
})(EmailConfirmPageForm);

export default injectIntl(withReduxForm);
