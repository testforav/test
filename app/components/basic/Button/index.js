/**
*
* Button
*
*/

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button as ValidationButton } from 'react-validation/lib/build/validation.rc';
import _ from 'lodash';

class Button extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
    	const className = classnames([
    		'btn',
    		{
    			'btn_uppercase': this.props.uppercase,
    			'btn_rounded': this.props.rounded,
    			'btn_bold': this.props.bold,
    			'btn_gradient_green': this.props.gradient,
    			'btn_block': this.props.block,
    			'btn_blue': this.props.blue,
    			'btn_slim': this.props.slim,
    			'btn_white': this.props.white,
                'btn_white-transparent': this.props.whiteTransparent,
    			'btn_aqua': this.props.aqua,
    			'btn_danger': this.props.danger,
    			'btn_wide': this.props.wide,
    			'form__submit': this.props.formSubmit,
                'btn_green': this.props.green,
                'btn-stack': this.props.stack,
    		},
    		this.props.className,
    	]);

        return (
            <button
                className={className}
                disabled={!_.isUndefined(this.props.disabled) ? this.props.disabled : false}
                {... this.props.onClick ? { onClick: this.props.onClick } : { }}
            >
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
	uppercase: PropTypes.bool,
	rounded: PropTypes.bool,
	bold: PropTypes.bool,
	gradient: PropTypes.bool,
	block: PropTypes.bool,
	blue: PropTypes.bool,
	slim: PropTypes.bool,
	white: PropTypes.bool,
    green: PropTypes.bool,
    whiteTransparent: PropTypes.bool,
	formSubmit: PropTypes.bool,
	aqua: PropTypes.bool,
	wide: PropTypes.bool,

};

export default Button;
