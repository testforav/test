/**
*
* SignupForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import {
    signupUserGoogle,
    signupUserFacebook,
} from 'core/containers/SignupPage/actions';

// redux-form components
import { Field, reduxForm } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import Checkbox from 'components/form/Checkbox';
import Select from 'components/form/Select';

import countryList from 'translations/countries.json';

import { required, requiredCheckbox, email } from 'utils/validators';

class AccountForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <form
                className={
                    'section__form'
                    + (this.props.submitting ? ' block-loading light' : '')
                }
                action="/"
                onSubmit={ this.props.handleSubmit }
            >
                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="FirstName"><FormattedMessage {...messages.firstname} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <Field
                            id="FirstName"
                            name="FirstName"
                            type="text"
                            className="form-control form-control_transparent"
                            disabled={this.props.isDisabled}
                            component={Input}
                        />
                    </div>
                </div>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="MiddleName"><FormattedMessage {...messages.midname} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <Field
                            id="MiddleName"
                            name="MiddleName"
                            type="text"
                            className="form-control form-control_transparent"
                            disabled={this.props.isDisabled}
                            component={Input}
                        />
                    </div>
                </div>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="LastName"><FormattedMessage {...messages.lastname} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <Field
                            id="LastName"
                            name="LastName"
                            type="text"
                            className="form-control form-control_transparent"
                            disabled={this.props.isDisabled}
                            component={Input}
                        />
                    </div>
                </div>

                <hr />

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="Email"><FormattedMessage {...messages.email} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <div className="form-group">
                            <Field
                                id="Email"
                                name="Email"
                                type="text"
                                className="form-control form-control_transparent"
                                disabled
                                component={Input}
                            />
                        </div>

                        <label htmlFor="EnableMarketingEmails" className="checkbox-container">
                            <Field
                                name="EnableMarketingEmails"
                                id="EnableMarketingEmails"
                                component={Checkbox}
                                onChange={
                                    (evt) => {
                                        this.props.setEmailAgreement(evt.target.checked);
                                    }
                                }
                                />
                            <FormattedMessage {...messages.emailAgreement} />
                        </label>
                    </div>
                </div>

                <hr/>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="Citizenship"><FormattedMessage {...messages.citizenship} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <Field
                            className="Select-custom_transparent"
                            name="Citizenship"
                            id="Citizenship"
                            placeholder="Citizenship"
                            options={countryList}
                            component={Select}
                            valueKey="code"
                            labelKey="name"
                            searchable={true}
                            disabled={this.props.isDisabled}
                            optionRenderer={
                                (option) => {
                                    if (option.flag) {
                                        return <span> <i className={"flag-icon flag-icon-" + option.flag } /> {option.name}</span>;
                                    } else if (option.divider) {
                                        return <hr />
                                    } else {
                                        return option.name;
                                    }
                                }
                            }
                            clearable={false}
                        />
                    </div>
                </div>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="Country"><FormattedMessage {...messages.residence} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <Field
                            className="Select-custom_transparent"
                            name="Country"
                            id="Country"
                            placeholder="Residence"
                            options={countryList}
                            valueKey="code"
                            labelKey="name"
                            searchable={true}
                            component={Select}
                            disabled={this.props.isDisabled}
                            optionRenderer={
                                (option) => {
                                    if (option.flag) {
                                        return <span> <i className={"flag-icon flag-icon-" + option.flag } /> {option.name}</span>;
                                    } else if (option.divider) {
                                        return <hr />
                                    } else {
                                        return option.name;
                                    }
                                }
                            }
                            clearable={false}
                        />
                    </div>
                </div>

                <div>
                    <Button
                        aqua
                        uppercase
                        wide
                    >
                        <FormattedMessage {...messages.save} />
                    </Button>
                </div>
            </form>
        );
    }
}

AccountForm.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'account'
})(AccountForm);

export default injectIntl(withReduxForm);
