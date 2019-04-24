/**
*
* PasswordPageForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

// redux-form components
import { Field, reduxForm } from 'redux-form';
import Button from 'components/basic/Button';
import Password from 'components/form/Password';
import PasswordRepeat from 'components/form/PasswordRepeat';
import { required, repeatPassword } from 'utils/validators';

class PasswordPageForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
                    <div className="row account__content__row form-group">
                        <div className="col-lg-4 col-sm-15 col-xs-15">
                            <div className="account__content__label text-secondary">
                                <label htmlFor="OldPassword"><FormattedMessage {...messages.oldpass} /></label>
                            </div>
                        </div>
                        <div className="col-lg-7 col-sm-15 col-xs-15">
                            <div className=" password-sneaker">
                                <Field
                                    className="form-control form-control_transparent"
                                    id="OldPassword"
                                    name="OldPassword"
                                    placeholder={this.props.intl.formatMessage(messages.oldpass)}
                                    autoComplete="off"
                                    autoFocus={true}
                                    tabIndex={1}
                                    validate={[ required ]}
                                    component={Password}
                                />
                            </div>
                        </div>
                    </div>

                    <Field
                        component={PasswordRepeat}
                        name="Password"
                        validate={[ repeatPassword ]}
                    />

                    <div className="form-group">
                        <Button
                            uppercase
                            aqua
                            wide
                            tabIndex={4}
                        >
                            <FormattedMessage {...messages.change} />
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

PasswordPageForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'password'
})(PasswordPageForm);

export default injectIntl(withReduxForm);
