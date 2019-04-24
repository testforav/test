/**
*
* Accordion
*
*/

import React from 'react';
// import styled from 'styled-components';
import SvgIcon from 'components/SvgIcon';

class Accordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            maxHeight: 0
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            maxHeight: this.state.isOpen ? 0 : this.contentEl.getBoundingClientRect().height + 30
        });
    }

    render() {
        return (
            <div className={'accordion-panel' + (this.state.isOpen ? ' accordion-panel-open' : '')}>
                <div onClick={() => this.toggle()} className="accordion-panel__header">
                    {this.props.title}
                    <div className="accordion-panel__header__trigger">
                        <span className="caret"></span>
                    </div>
                </div>
                <div className="accordion-panel__body" style={{maxHeight: this.state.maxHeight}}>
                    <div ref={(element) => {this.contentEl = element}} className="accordion-panel__body__content">
                        {React.Children.toArray(this.props.children)}
                    </div>
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {

};

export default Accordion;
