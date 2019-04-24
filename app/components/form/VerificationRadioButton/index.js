/**
*
* VerificationRadioButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import Error from 'components/form/Error';

function VerificationRadioButton(field) {
    const content = [ ];
    for (let i = 0, l = field.options.length; i < l; i++) {
        content.push(
            <label 
                key={i} 
                htmlFor={field.options[i].id} 
                className={
                    "verification__form__radio__label" +
                    ((field.options[i].className) ? (' ' + field.options[i].className) : '')
                }
            >
                <input
                    type="radio"
                    onChange={
                        (evt) => {
                            _debug('change radio: ', evt.target.value);
                            field.input.onChange(evt.target.value);
                        }
                    }
                    checked={ field.input.value === field.options[i].id }
                    className="verification__form__radio"
                    name={field.name}
                    id={field.options[i].id}
                    value={field.options[i].id}
                    disabled={field.disabled}
                    tabIndex={field.tabIndexStart + i + ""}
                />
                <div className="verification__form__radio__button">
                    <span>{field.options[i].label}</span>
                </div>
            </label>
        );
    }

    return (
        <div className={
            "verification__form__radio__wrapper" +
            ((field.disabled) ? ' verification__form__radio__wrapper-disabled' : '')
        }>
        
            {content}

            {
                field.meta.touched && field.meta.error ? <Error error={field.meta.error} value={field.input.value} /> : null
            }

        </div>
    );
}

VerificationRadioButton.propTypes = {

};

export default VerificationRadioButton;
