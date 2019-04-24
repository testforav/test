/**
*
* InputRound
*
*/

import React from 'react';
// import styled from 'styled-components';
import Error from 'components/form/Error';

function InputRound(field) {
    const showError = field.meta.touched && field.meta.error;

    return (
        <div
            className={ showError ? 'error' : '' }
        >
            <label className={"input-label"} htmlFor={field.id}>
                {
                    showError
                    ? <Error view="simple" error={field.meta.error} value={field.input.value} />
                : field.label
                }
            </label>
            <input
                type={ field.type || 'text' }
                className={ field.className + (showError ? ' control-error' : '')}
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                disabled={field.disabled}
                autoComplete={field.autoComplete}
                autoFocus={field.autoFocus}
                tabIndex={field.tabIndex}
                { ... field.input }
            />

        </div>
    );
}

InputRound.propTypes = {

};

export default InputRound;
