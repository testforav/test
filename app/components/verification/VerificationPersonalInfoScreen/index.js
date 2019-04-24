/**
*
* VerificationPersonalInfoScreen
*
*/

import React from 'react';
import { connect } from 'react-redux'

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ReactGA from 'react-ga';

import nationalitiesList from 'translations/nationalities.json';
import countryList from 'translations/countries.json';

// redux-form components
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import Select from 'components/form/Select';
import VerificationRadioButton from 'components/form/VerificationRadioButton';
import BirthdayCalendar from 'components/form/BirthdayCalendar';
import { required, phone } from 'utils/validators';
import { phoneMask } from 'utils/input-masks';



class VerificationPersonalInfoScreen extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <form
                className={
                    "verification__form" +
                    (this.props.submitting ? ' block-loading' : '')
                }
                onSubmit={
                    (evt) => {
                        ReactGA.event({
                            category: 'Verification',
                            action: 'Step1',
                            label: 'Submit',
                            value: 1
                        });

                        this.props.handleSubmit(evt);
                    }
                }
            >
                <div className="verification__form__row verification__form__row-mobile-wide">
                    <div className="verification__form__column">
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="FirstName" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.firstNameLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="FirstName"
                                type="text"
                                name="FirstName"
                                autoFocus={true}
                                tabIndex="1"
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.firstNameLabel)
                                }
                                autoComplete="false"
                                validate={[ required ]}
                                component={Input}
                            />
                        </div>
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="LastName" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.lastNameLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="LastName"
                                type="text"
                                name="LastName"
                                tabIndex="2"
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.lastNameLabel)
                                }
                                autoComplete="false"
                                validate={[ required ]}
                                component={Input}
                            />
                        </div>
                        <div className="form-group form-control-wrap form-group_section  verification__form__optional">
                            <label htmlFor="MiddleName" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.middleNameLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="MiddleName"
                                type="text"
                                name="MiddleName"
                                tabIndex="3"
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.middleNameLabel)
                                }
                                autoComplete="false"
                                validate={[ ]}
                                component={Input}
                            />
                        </div>
                    </div>
                    <div className="verification__form__column">
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="Gender" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.genderLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="Gender"
                                name="Gender"
                                tabIndexStart="4"
                                options={[
                                    {
                                        id: 'male',
                                        label: this.props.intl.formatMessage(this.props.messages.maleGenderLabel),
                                    },
                                    {
                                        id: 'female',
                                        label: this.props.intl.formatMessage(this.props.messages.femaleGenderLabel),
                                    },
                                    {
                                        id: 'other',
                                        label: this.props.intl.formatMessage(this.props.messages.otherGenderLabel),
                                        className: 'verification__form__radio__label__two_rows'
                                    },
                                ]}
                                validate={[ required ]}
                                component={VerificationRadioButton}
                            />
                        </div>
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="Dob" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.dobLabel} />
                            </label>
                            <Field
                                id="Dob"
                                name="Dob"
                                tabIndexStart={7}
                                component={BirthdayCalendar}
                            />
                        </div>
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="Citizenship" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.nationalityLabel} />
                            </label>
                            <Field
                                className="Select-custom_transparent"
                                name="Citizenship"
                                id="Citizenship"
                                openOnFocus={true}
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.nationalityLabel)
                                }
                                options={nationalitiesList}
                                valueKey="code"
                                labelKey="name"
                                searchable={true}
                                tabIndex="10"
                                optionRenderer={
                                    (option) => {
                                        // _debug(option);
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
                                validate={[ required ]}
                                component={Select}
                            />
                        </div>
                        <div className="form-group form-control-wrap form-group_section  verification__form__optional">
                            <label htmlFor="Phone" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.phoneLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="Phone"
                                type="text"
                                name="Phone"
                                tabIndex="11"
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.phoneLabel)
                                }
                                autoComplete="false"
                                {...phoneMask}
                                validate={[ ]}
                                component={Input}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="verification__form__row verification__form__row-mobile-wide">
                    <div className="verification__form__column">
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="DocumentNumber" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.documentNumberLabel} />
                            </label>
                            <Field
                                className="form-control form-control_transparent"
                                id="DocumentNumber"
                                type="text"
                                name="DocumentNumber"
                                tabIndex="11"
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.documentNumberLabel)
                                }
                                autoComplete="false"
                                validate={[ required ]}
                                component={Input}
                            />
                        </div>

                        {
                            this.props.isDrivingLicense ? (
                                <div className="form-group form-control-wrap form-group_section">
                                    <label htmlFor="DocumentCountry" className="verification__form__label">
                                        <FormattedMessage {...this.props.messages.documentCountryLabel} />
                                    </label>
                                    <Field
                                        className="Select-custom_transparent"
                                        name="DocumentCountry"
                                        id="DocumentCountry"
                                        validate={[ required ]}
                                        placeholder={
                                            this.props.intl.formatMessage(this.props.messages.documentCountryLabel)
                                        }
                                        options={countryList}
                                        tabIndex="14"
                                        openOnFocus={true}
                                        valueKey="code"
                                        labelKey="name"
                                        searchable={true}
                                        optionRenderer={
                                            (option) => {
                                                // _debug(option);
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
                                        component={Select}
                                    />
                                </div>
                            ) : null
                        }

                    </div>
                    <div className="verification__form__column">
                        <div className="form-group form-control-wrap form-group_section">
                            <label htmlFor="DocumentType" className="verification__form__label">
                                <FormattedMessage {...this.props.messages.documentTypeLabel} />
                            </label>
                            <Field
                                className="Select-custom_transparent"
                                name="DocumentType"
                                id="DocumentType"
                                tabIndex="13"
                                openOnFocus={true}
                                validate={[ required ]}
                                placeholder={
                                    this.props.intl.formatMessage(this.props.messages.documentTypeLabel)
                                }
                                options={
                                    [
                                        {
                                            id: 'passport',
                                            label: this.props.intl.formatMessage(this.props.messages.passportDocumentType),
                                        },
                                        {
                                            id: 'driving_licence',
                                            label: this.props.intl.formatMessage(this.props.messages.drivingLicenceDocumentType),
                                        },
                                        {
                                            id: 'national_identity_card',
                                            label: this.props.intl.formatMessage(this.props.messages.nationalIdDocumentType),
                                        },
                                    ]
                                }
                                valueKey="id"
                                labelKey="label"
                                searchable={true}
                                clearable={false}
                                component={Select}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    uppercase
                    bold
                    wide
                    aqua
                    formSubmit
                    tabIndex={15}
                >
                    <FormattedMessage {...this.props.messages.nextStepButton} />
                </Button>

            </form>
        );
    }
}

VerificationPersonalInfoScreen.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'verificationPersonalInfo'
})(VerificationPersonalInfoScreen);

// Decorate with connect to read form values
const selector = formValueSelector('verificationPersonalInfo') // <-- same as form name
const withReduxFormAndSelector = connect(state => {
    // can select values individually
    const isDrivingLicense = selector(state, 'DocumentType') === 'driving_licence';
    return {
        isDrivingLicense,
    };
})(withReduxForm)

export default injectIntl(withReduxFormAndSelector);
