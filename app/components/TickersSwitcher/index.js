/**
*
* TickersSwitcher
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TickersSwitcher extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        _debug('render Tickers Switcher: ', this.props.currency);
        return (
            <form className="tickers__switchers">
                <div className="tickers__switchers__item">
                    <input
                        type="radio"
                        name="headerTickers"
                        className="tickers__switcher"
                        id="usd"
                        value="usd"
                        checked={this.props.currency === 'usd'}
                        onChange={this.props.onCurrencyChange}
                    />
                    <label htmlFor="usd" className="tickers__switcher__label">
                        <span className="tickers__switcher__label__text">USD</span>
                    </label>
                </div>

                <div className="tickers__switchers__item hidden">
                    <input
                        type="radio"
                        name="headerTickers"
                        className="tickers__switcher"
                        id="cny"
                        value="cny"
                        checked={this.props.currency === 'cny'}
                        onChange={this.props.onCurrencyChange}
                    />
                    <label htmlFor="cny" className="tickers__switcher__label">
                        <span className="tickers__switcher__label__text">CNY</span>
                    </label>
                </div>

                <div className="tickers__switchers__item">
                    <input
                        type="radio"
                        name="headerTickers"
                        className="tickers__switcher"
                        id="eur"
                        value="eur"
                        checked={this.props.currency === 'eur'}
                        onChange={this.props.onCurrencyChange}
                    />
                    <label htmlFor="eur" className="tickers__switcher__label tickers__switcher__label-last">
                        <span className="tickers__switcher__label__text">EUR</span>
                    </label>
                </div>
            </form>
        );
    }
}

TickersSwitcher.propTypes = {
    onCurrencyChange: React.PropTypes.func,
};

export default TickersSwitcher;
