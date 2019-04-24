/**
*
* Checkbox
*
*/

import React from 'react';
// import styled from 'styled-components';
import Error from 'components/form/Error';

function Checkbox(field) {
    return (
        <div
            className={ 'checkbox-wrap' + (field.meta.error ? ' error' : '') }
        >
            <input
                type={ 'checkbox' }
                className={ field.className }
                id={field.id}
                name={field.name}
                disabled={field.disabled}
                autoFocus={field.autoFocus}
                checked={!!field.input.value}
                tabIndex={field.tabIndex}
                { ... field.input }
            />
            <i></i>

            {
                field.meta.touched && field.meta.error ? <Error error={field.meta.error} value={field.input.value} /> : null
            }

        </div>
    );
}

Checkbox.propTypes = {

};

export default Checkbox;
