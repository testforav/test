/**
*
* Input
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Input as ValidationInput } from 'react-validation/lib/build/validation.rc';

class Input extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        _debug('default value: ', props.defaultValue);
        this.state = {
            value: props.defaultValue ? props.defaultValue : '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && (this.state.value !== nextProps.value)) {
            this.setState({
                value: nextProps.value ? nextProps.value : '',
            });
        }
    }

    render() {
        return (
            <ValidationInput
                value={this.state.value}
                className={this.props.className}
                id={this.props.id}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                autoComplete={this.props.autoComplete}
                autoFocus={this.props.autoFocus}
                tabIndex={this.props.tabIndex}
                validations={this.props.validations}
                errorContainerClassName={this.props.errorContainerClassName}
                errorClassName={this.props.errorClassName}
                data-minvalue={this.props['data-minvalue']}
                onChange={
                    (evt) => {
                        this.setState({
                            value: evt.target.value,
                        });
                        if (this.props.onChange) {
                            this.props.onChange(evt);
                        }
                    }
                }
            />
        );
    }
}

Input.propTypes = {

};

export default Input;
