/**
*
* Select
*
*/

import React from 'react';
// import styled from 'styled-components';
import CustomSelect from 'components/CustomSelect';
import Error from 'components/form/Error';

function Select(field) {
    return (
        <div
            className={ field.meta.error ? 'error' : '' }
        >
            <CustomSelect
                { ... field }
                value={field.input.value}
                onChange={
                    (value) => {
                        _debug('field change', value, field, field.valueKey);
                        field.input.onChange(value[field.valueKey]);
                    }
                }
            />

            {
                field.meta.touched && field.meta.error ? <Error error={field.meta.error} value={field.input.value} /> : null
            }

        </div>
    );
}

Select.propTypes = {

};

export default Select;
