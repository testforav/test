/**
*
* UploadButton
*
*/

import React from 'react';
// import styled from 'styled-components';


class UploadButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={'component__upload__wrapper' + (this.props.className ? (' ' + this.props.className) : '')}>
                {React.Children.toArray(this.props.children)}
                <input
                    type="file"
                    disabled={this.props.disabled}
                    className="component__upload__input"
                    {... (this.props.inputProps) ? this.props.inputProps : {}}
                    {... (this.props.onChange) ? { onChange: this.props.onChange } : {}}
                />
            </div>
        );
    }
}

UploadButton.propTypes = {

};

export default UploadButton;
