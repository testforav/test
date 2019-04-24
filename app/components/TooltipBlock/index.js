/**
*
* TooltipBlock
*
*/

import React from 'react';
// import styled from 'styled-components';
import Button from 'components/basic/Button';
import SvgIcon from 'components/SvgIcon';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TooltipBlock extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={
                'alert tooltip-alert' +
                ((this.props.className) ? (' ' + this.props.className) : '')
            }>
                <SvgIcon name="cross" onClick={this.props.onClose} />
                {this.props.children}
            </div>
        );
    }
}

TooltipBlock.propTypes = {

};

export default TooltipBlock;
