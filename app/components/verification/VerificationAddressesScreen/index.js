/**
*
* VerificationAddressesScreen
*
*/

import React from 'react';
// import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import countryList from 'translations/countries.json';

// redux-form components
import { Field, reduxForm } from 'redux-form'
import Button from 'components/basic/Button';
import Input from 'components/form/Input';
import Select from 'components/form/Select';
import VerificationRadioButton from 'components/form/VerificationRadioButton';
import BirthdayCalendar from 'components/form/BirthdayCalendar';
import { required } from 'utils/validators';

class VerificationAddressesScreen extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <form
            	className={
                    "verification__form" + 
                    (this.props.submitting ? ' block-loading' : '')
                } 
                onSubmit={ this.props.handleSubmit }
	        >
            	<div>
                    <div className="form-group form-control-wrap form-group_section">
                        <label htmlFor="Country" className="verification__form__label">
                            <FormattedMessage {...this.props.messages.countryLabel} />
                        </label>
                        <Field
                            component={Select}
                            className="Select-custom_transparent"
                            name="Country"
                            disabled={this.props.disabled}
                            id="Country"
                            placeholder={
                                this.props.intl.formatMessage(this.props.messages.countryLabel)
                            }
                            options={countryList}
                            tabIndex={"1"}
                            openOnFocus={true}
                            autoFocus={true}
                            valueKey="code"
                            validate={[ required ]}
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
                        />
                    </div>
                    <div className="form-group form-control-wrap form-group_section verification__form__optional">
                        <label htmlFor="State" className="verification__form__label">
                            <FormattedMessage {...this.props.messages.stateLabel} />
                        </label>
                        <Field
                            component={Input}
                            className="form-control form-control_transparent"
                            id="State"
                            type="text"
                            tabIndex={"2"}
                            name="State"
                            disabled={this.props.disabled}
                            placeholder={
                                this.props.intl.formatMessage(this.props.messages.stateLabel)
                            }
                            autoComplete="false"
                            validate={[ ]}
                        />
                    </div>
                    <div className="form-group form-control-wrap form-group_section">
                        <label htmlFor="City" className="verification__form__label">
                            <FormattedMessage {...this.props.messages.cityLabel} />
                        </label>
                        <Field
                            component={Input}
                            className="form-control form-control_transparent"
                            id="City"
                            type="text"
                            name="City"
                            tabIndex={"3"}
                            disabled={this.props.disabled}
                            placeholder={
                                this.props.intl.formatMessage(this.props.messages.cityLabel)
                            }
                            autoComplete="false"
                            validate={[ required ]}
                        />
                    </div>
                    <div className="form-group form-control-wrap form-group_section">
                        <label htmlFor="Address" className="verification__form__label">
                            <FormattedMessage {...this.props.messages.addressLabel} />
                        </label>
                        <Field
                            component={Input}
                            className="form-control form-control_transparent"
                            id="Address"
                            type="text"
                            name="Address"
                            tabIndex={"4"}
                            disabled={this.props.disabled}
                            placeholder={
                                this.props.intl.formatMessage(this.props.messages.addressLabel)
                            }
                            autoComplete="false"
                            validate={[ required ]}
                        />
                    </div>
            	</div>

                {
                    this.props.hasNoBack ? null : (
                        <Button
                            uppercase
                            bold
                            whiteTransparent
                            formSubmit
                            wide
                            onClick={this.props.goBack}
                            className="verification__back__button"
                            noForm
                            tabIndex={5}
                        >
                            <i className="ico-left-open"></i> <FormattedMessage {...this.props.messages.backButton} />
                        </Button>
                    )
                }                

                <Button
                	uppercase
                	bold
                	wide
                	aqua
                	formSubmit
                    tabIndex={6}
                >
                    <FormattedMessage {...this.props.messages.nextStepButton} />
                </Button>

            </form>
        );
    }
}

VerificationAddressesScreen.propTypes = {

};

const withReduxForm = reduxForm({
  form: 'verificationAddresses'
})(VerificationAddressesScreen);

export default injectIntl(withReduxForm);
