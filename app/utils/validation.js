import React from 'react';
import { rules } from 'react-validation/lib/build/validation.rc';
import validator from 'validator';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';

const validationRules = _.assign(rules, {
    // Key name maps the rule
    required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
        rule: (value) => {
            return value ? value.toString().trim() : '';
        },
        // Function to return hint
        // You may use current value to inject it in some way to the hint
        hint: () => {
            return (
                <label className="error-hint is-visible">This field is required.</label>
            );
        }
    },
    email: {
        // Example usage with external 'validator'
        rule: (value) => {
            return validator.isEmail(value);
        },
        hint: (value) => {
            return (
                <label className="error-hint is-visible">{value} isnt an Email.</label>
            );
        }
    },
    phone: {
        rule: (value) => {
            const isPhone = !value || /^[^a-z\!@#\$\%\^\*\&]+$/gi.test(value);
            return isPhone;
        },
        hint: (value) => {
            return (
                <label className="error-hint is-visible">{value} isnt valid phone.</label>
            );
        }
    },
    digit: {
        rule: (value) => {
            return validator.isNumeric(value);
        },
        hint: (value) => {
            return (
                <label className="error-hint is-visible">Please enter only digits</label>
            );
        }
    },
    minAmount: {
        rule: (value, components) => {
            const input = components.amount;
            const minvalue = input.props['data-minvalue'];

            value = parseFloat(value);
            isNaN(value) && (value = 0);

            return (value >= minvalue);
        },
        hint: (value, components) => {
            const input = components.amount;
            const minvalue = input.props['data-minvalue'];

            return (
                <label className="error-hint is-visible">Minimum amount is {minvalue}</label>
            );
        }
    },
    minDocument: {
        rule: (value, components) => {
            const input = components.DocumentNumber;
            const minvalue = input.props['data-minvalue'];

            value = value;
            !value && (value = '');

            return (value.length >= minvalue);
        },
        hint: (value, components) => {
            const input = components.DocumentNumber;
            const minvalue = input.props['data-minvalue'];

            return (
                <label className="error-hint is-visible">Minimum length is {minvalue}</label>
            );
        }
    },
    floats: {
        rule: (value) => {
            return validator.isFloat(value);
        },
        hint: (value) => {
            return (
                <label className="error-hint is-visible">Please enter only numbers</label>
            );
        }
    },
    strength: {
        rule: (value, components) => {
            const password = components.pass;
            const score = zxcvbn(value).score;

            password.setState({
                strScore: score
            });

            return score > 1;
        },
        hint: () => {
            return (
                <label className="error-hint is-visible">Password is too weak.</label>
            );
        }
    },
    // This example shows a way to handle common task - compare two fields for equality
    password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
        rule: (value, components) => {
            const password = components.pass.state;
            const passwordConfirm = components.confirm_pass.state;
            const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
            const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

            if (!isBothUsed || !isBothChanged) {
                return true;
            }

            return password.value === passwordConfirm.value;
        },
        hint: () => {
            return (
                <label className="error-hint is-visible">Passwords should be equal.</label>
            );
        }
    },
    // Define API rule to show hint after API error response
    api: {
        // We don't need the rule here because we will call the 'showError' method by hand on API error
        hint: (value, components) => {
            return (
                <button
                    className="form-error is-visible"
                >
                    API Error on {value} value. Focus to hide.
                </button>
            );
        }
    }
});

export default validationRules;
