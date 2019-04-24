/**
*
* Select
*
*/

import React from 'react';
// import styled from 'styled-components';
import RenderInComponent from 'components/RenderInComponent';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CustomSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function
    customRender(element) {
        if (!this.isInited) {
            this.isInited = true;
            const __renderOuter = element.renderOuter;

            element.renderOuter = function (options, valueArray, focusedOption) {
                const outer = __renderOuter.apply(this, [options, valueArray, focusedOption]);
                const bounds = element.wrapper.getBoundingClientRect();
                const styles = {
                    top: bounds.bottom + window.scrollY + 15 + 'px',
                    left: bounds.left + window.scrollX + 'px',
                    width: (bounds.right - bounds.left - 1) + 'px',
                };

                return (
                    <RenderInComponent target="BODY" insertFirst="true">
                        <div className="Select-menu-outer-custom" style={styles} ref={(el) => this.bodyOuter = el}>
                            {outer}
                        </div>
                    </RenderInComponent>
                );
            };
            element.handleTouchOutside = (event) => {
                // handle touch outside on ios to dismiss menu
                if (this.wrapper && !(this.wrapper.contains(event.target) || this.bodyOuter.contains(event.target))) {
                    this.closeMenu();
                }
            };
        }
    }
    render() {
        return (
            <Select
                {...this.props}
                className={
                    'Select-custom'
                    + (this.props.className ? (' ' + this.props.className) : '')
                }
                ref={(element) => this.customRender(element)}
            />
        );
    }
}

CustomSelect.propTypes = {

};

export default CustomSelect;
