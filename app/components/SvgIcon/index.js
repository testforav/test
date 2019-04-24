/**
*
* SvgIcon
*
*/

import React from 'react';
// import styled from 'styled-components';


class SvgIcon extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <i className={'text-middle ico ico-' + this.props.name + (this.props.className ? ' ' + this.props.className : '')} />
        );
    }
}

SvgIcon.propTypes = {
    name: React.PropTypes.string,
};

export default SvgIcon;
