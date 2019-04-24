/**
*
* Input
*
*/

import React from 'react';
// import styled from 'styled-components';
import Error from 'components/form/Error';

function Input(field) {
    const showError = field.meta.touched && field.meta.error;

    return (
        <div
            className={ showError ? 'error' : '' }
        >
            <input
                type={ field.type || 'text' }
                className={ field.className }
                id={field.id}
                name={field.name}
                placeholder={field.placeholder}
                disabled={field.disabled}
                autoComplete={field.autoComplete}
                autoFocus={field.autoFocus}
                tabIndex={field.tabIndex}
                { ... field.input }
            />

            {
                showError ? <Error error={field.meta.error} value={field.input.value} /> : null
            }

        </div>
    );
}

Input.propTypes = {

};

export default Input;
