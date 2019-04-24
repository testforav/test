/**
*
* Tickers
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Tickers extends React.Component { // eslint-disable-line react/prefer-stateless-function
    getTickers(label) {
        return this.props.tickers['tickers-' + label + this.props.currency];
    }
    render() {
        const tickersBTC = this.getTickers('btc');
        const tickersETH = this.getTickers('eth');
        const tickersLTC = this.getTickers('ltc');
        const tickersUSD = this.getTickers('usd');
        return (
            <div className="tickers__elements">

                {(tickersBTC) ? (
                    <div className="tickers__element">
                        <div className="tickers__element__wrapper">
                            <div className="tickers__element__label">
                                <span>{ this.props.currency.toUpperCase() }</span> / BTC
                            </div>
                            <span className="tickers__element__value"> {tickersBTC.ticker} </span>
                            {(tickersBTC.perc < 0) ? (
                                <span className="main-page__currency-arrow main-page__currency-arrow_down"></span>
                            ) : (
                                <span className="main-page__currency-arrow main-page__currency-arrow_up"></span>
                            )}
                        </div>
                    </div>
                ) : (null)}

                {(tickersLTC) ? (
                    <div className="tickers__element">
                        <div className="tickers__element__wrapper">
                            <div className="tickers__element__label">
                                <span>{ this.props.currency.toUpperCase() }</span> / LTC
                            </div>
                            <span className="tickers__element__value"> {tickersLTC.ticker} </span>
                            {(tickersLTC.perc < 0) ? (
                                <span className="main-page__currency-arrow main-page__currency-arrow_down"></span>
                            ) : (
                                <span className="main-page__currency-arrow main-page__currency-arrow_up"></span>
                            )}
                        </div>
                    </div>
                ) : (null)}

                {(tickersETH) ? (
                    <div className="tickers__element">
                        <div className="tickers__element__wrapper">
                            <div className="tickers__element__label">
                                <span>{ this.props.currency.toUpperCase() }</span> / ETH
                            </div>
                            <span className="tickers__element__value"> {tickersETH.ticker} </span>
                            {(tickersETH.perc < 0) ? (
                                <span className="main-page__currency-arrow main-page__currency-arrow_down"></span>
                            ) : (
                                <span className="main-page__currency-arrow main-page__currency-arrow_up"></span>
                            )}
                        </div>
                    </div>
                ) : (null)}

                {(tickersUSD) && (this.props.currency.toUpperCase() !== 'USD') ? (
                    <div className="tickers__element">
                        <div className="tickers__element__wrapper">
                            <div className="tickers__element__label">
                                <span>{ this.props.currency.toUpperCase() }</span> / USD
                            </div>
                            <span className="tickers__element__value"> {tickersUSD.ticker} </span>
                            {(tickersUSD.perc < 0) ? (
                                <span className="main-page__currency-arrow main-page__currency-arrow_down"></span>
                            ) : (
                                <span className="main-page__currency-arrow main-page__currency-arrow_up"></span>
                            )}
                        </div>
                    </div>
                ) : (null)}
            </div>
        );
    }
}

Tickers.propTypes = {

};

export default Tickers;
