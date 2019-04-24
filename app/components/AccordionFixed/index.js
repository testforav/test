/**
*
* AccordionFixed
*
*/

import React from 'react';
// import styled from 'styled-components';
import SvgIcon from 'components/SvgIcon';

const MIN_HEIGHT = 190;
const BOTTOM_MARGIN = 10;
const BLOCKS_MARGIN = 75;

class AccordionFixed extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            height: 0,
            maxHeight: 0,
            minHeight: 0
        };
    }

    toggle() {
        let maxHeight = 0;
        let expandSize = 0;
        const commonContainerBounding = this.props.commonContainerEl.getBoundingClientRect();

        if (!this.state.isOpen) {
            // Ориентируемся по строкам на основании 1го элемента и соотв 1й строки
            const firstItem = this.props.getItem(0);
            const firstItemBindings = firstItem.containerEl.getBoundingClientRect();
            const isLastBlock = this.props.blockIndex === this.props.totalBlocks;

            const contentHeight = this.contentEl.getBoundingClientRect().height;

            const itemsTotal = this.props.total;
            const itemPlace = this.props.index + 1;

            const itemBounding = this.containerEl.getBoundingClientRect();
            const parentBounding = this.containerEl.parentNode.getBoundingClientRect();
            const headerBounding = this.contentHeaderEl.parentNode.getBoundingClientRect();

            const itemsInFirstRow = Math.floor(parentBounding.width / firstItemBindings.width);
            const itemsInRow = Math.floor(parentBounding.width / itemBounding.width);
            const rowRemainder = itemsTotal % itemsInFirstRow;
            const isLastRow = rowRemainder === itemsInRow
                ? true
                : rowRemainder
                    ? itemPlace > (itemsTotal - rowRemainder)
                    : itemPlace > (itemsTotal - itemsInRow);
            const rowsLeft = isLastRow ? 0 : Math.ceil(itemsTotal / itemsInRow) - Math.ceil(itemPlace / itemsInRow);
            const rowHeight = headerBounding.height + BOTTOM_MARGIN;
            const contentRows = Math.ceil(contentHeight / rowHeight);
            const heightToNextBlock = ((contentRows - 1) * rowHeight) + BLOCKS_MARGIN;

            maxHeight = contentRows <= rowsLeft
                ? contentRows * rowHeight
                : contentRows > 1 && contentHeight < heightToNextBlock
                    ? heightToNextBlock
                    : (contentRows * rowHeight) + BLOCKS_MARGIN;

            expandSize = !isLastBlock
                ? 0 // Пока считаем, что если раздел не последний, то места до футера хватает
                : rowsLeft
                    ? maxHeight - (BOTTOM_MARGIN * (rowsLeft + 1)) - (rowsLeft * headerBounding.height)
                    : maxHeight; // Если последний ряд, то расширяем на всю высоту текста
        }

        this.props.toggleActiveItem(this);

        if (this.state.isOpen) {
            this.props.resetContainerHeight();
        } else if (!this.state.isOpen && expandSize > 0) {
            this.props.setContainerHeight(this.props.commonContainerDefaultSize + expandSize);
        }

        this.setState({
            isOpen: !this.state.isOpen,
            height: this.state.isOpen ? 0 : maxHeight,
        });
    }

    render() {
        return (
            <div
                ref={(element) => {this.containerEl = element}}
                onClick={(e) => this.toggle(e)} className={'accordion-panel-fixed' + (this.state.isOpen ? ' accordion-panel-fixed-open' : '')}
                >
                <div className="accordion-panel-fixed__header" ref={(element) => {this.contentHeaderEl = element}}>
                    {
                        this.props.idx &&
                        <div className={"accordion-panel-fixed__header__ico faq-" + this.props.idx}></div>
                    }
                    <div className="accordion-panel-fixed__header__title">
                        {this.props.title}
                    </div>
                    <div className="accordion-panel-fixed__header__trigger">
                        <i className="ico-downopen accordion-panel-fixed__caret"></i>
                    </div>
                </div>
                <div className={"accordion-panel-fixed__body" + (this.props.noBg ? ' nobg' : '')} style={{height: this.state.height}}>
                    <div ref={(element) => {this.contentEl = element}} className="accordion-panel-fixed__body__content">
                        {React.Children.toArray(this.props.children)}
                    </div>
                </div>
            </div>
        );
    }
}

AccordionFixed.propTypes = {

};

export default AccordionFixed;
