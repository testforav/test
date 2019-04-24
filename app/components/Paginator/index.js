/**
*
* Paginator
*
*/

import React from 'react';
// import styled from 'styled-components';
import SvgIcon from 'components/SvgIcon';

class Paginator extends React.Component { // eslint-disable-line react/prefer-stateless-function
    setPage(page) {
        if ((page < 1) || (page > this.props.maxPage) || (page === this.props.activePage)) {
            return;
        }
        this.props.setPage(page);
    }
    renderItem(num) {
        return (
            <div
                className={'paginator__item' + ((num === this.props.activePage) ? ' paginator__item-active' : '')}
                onClick={() => this.setPage(num)}
                key={num}
            >
                <span>{num}</span>
            </div>
        );
    }
    render() {
        const content = [];
        for (let i = 0, l = this.props.maxPage; i < l; i++) {
            content.push(this.renderItem(i + 1));
        }

        return (
            (content.length) ? (
                <div className="paginator">
                    <div className="paginator__content desktop-only">
                        <div
                            className={'paginator__arrow' + ((this.props.activePage === 1) ? ' paginator__arrow-disabled' : '')}
                            onClick={() => this.setPage(this.props.activePage - 1)}
                        >
                            <SvgIcon name="prev" />
                        </div>


                        {content}


                        <div
                            className={'paginator__arrow' + ((this.props.activePage === this.props.maxPage) ? ' paginator__arrow-disabled' : '')}
                            onClick={() => this.setPage(this.props.activePage + 1)}
                        >
                            <SvgIcon name="next" />
                        </div>
                    </div>

                    <div className="paginator__content tablet-only">
                        <div
                            className={'btn btn_white paginator__arrow-mobile' + ((this.props.activePage === 1) ? ' disabled' : '')}
                            onClick={() => this.setPage(this.props.activePage - 1)}
                        >
                            <SvgIcon name="prev" /> Prev
                        </div>


                        {this.renderItem(this.props.activePage)}


                        <div
                            className={'btn btn_white paginator__arrow-mobile' + ((this.props.activePage === this.props.maxPage) ? ' disabled' : '')}
                            onClick={() => this.setPage(this.props.activePage + 1)}
                        >
                                Next <SvgIcon name="next" />
                        </div>
                    </div>
                </div>
            ) : <i />
        );
    }
}

Paginator.propTypes = {

};

export default Paginator;
