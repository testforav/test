/*
 *
 * WalletsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import QRCode from 'qrcode.react';

import currencies from 'translations/currencies.json';
import ProfileWithSidebar from 'components/ProfileWithSidebar';
import CopyToClipboard from 'components/CopyToClipboard';
import ModalCommon from 'components/ModalCommon';
import SvgIcon from 'components/SvgIcon';

import makeSelectWalletsPage from 'core/containers/WalletsPage/selectors';
import {
    loadWallets
} from 'core/containers/WalletsPage/actions';
import messages from './messages';

export class WalletsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            qrAddress: '',
            qrModalOpen: false
        };
    }

    openQrModal(address) {
        this.setState({
            qrAddress: address,
            qrModalOpen: true
        });
    }

    closeQrModal() {
        this.setState({
            qrAddress: '',
            qrModalOpen: false
        });
    }

    componentDidMount() {
        this.props.dispatch(loadWallets());
    }

    render() {
        _debug('wallets: ', this.props.WalletsPage.walletsList);

        const rows = this.props.WalletsPage.walletsList.map((item, index) => (
            <tr
                key={`item-${index}`}
                className={(item.Currency === 'fiat' ? 'hidden' : '')}
            >
                <td className="coin__cell">
                    <div className="coin-wrap">
                        <div className={"coin " + item.Currency}><i className={"ico-" + item.Currency}></i></div>
                        <div className="coin-name">{currencies[item.Currency]}</div>
                    </div>
                </td>
                <td className="address__cell" title={item.Address}>
                    <div className="text-overflow">
                        {item.Address}
                    </div>
                </td>
                <td className="wallets-table__actions">
                    <CopyToClipboard
                        className="wallets__action"
                        text={item.Address}
                        dispatch={this.props.dispatch}
                        message={{
                            type: 'success',
                            message: 'Copied: ' + item.Address,
                            timeout: 500,
                        }}
                    >
                        <SvgIcon name="copy" />
                    </CopyToClipboard>

                    <span
                        className="wallets__action"
                        onClick={() => { this.openQrModal(item.Address) }}
                        >
                        <SvgIcon name="qr-code" />
                    </span>
                </td>
            </tr>
        ));

        const rowsMobile = this.props.WalletsPage.walletsList.map((item, index) => (
            <tr
                key={`item-${index}`}
                className={(item.Currency === 'fiat' ? 'hidden' : '')}
            >
                <td className="wallets__list__mobile">
                    <div className="coin-name coin-name_mobile"><i className={"ico-" + item.Currency}></i> {currencies[item.Currency]}</div>
                    <div className="wallets__list__address text-overflow">
                        {item.Address}
                    </div>
                    <div>
                        <span
                            className="wallets__action"
                            onClick={() => { this.openQrModal(item.Address) }}
                            >
                            <SvgIcon name="qr-code" />
                        </span>
                    </div>
                </td>
            </tr>
        ));

        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Account"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div
                    className={
                        'profile__section account'
                    }
                >
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>

                    <div className={
                            "wallets-table-wrap non-mobile-only"
                            + (this.props.WalletsPage.isLoading ? ' block-loading' : '')
                        }>
                        <table className="table wallets-table">
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>

                            <thead>
                                <tr>
                                    <th className="coin__cell">Coin</th>
                                    <th className="address__cell">Address</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="wallets-table-wrap mobile-only">
                    <table className="table wallets-table">
                        <colgroup>
                            <col/>
                            <col/>
                        </colgroup>

                        <tbody>
                            {rowsMobile}
                        </tbody>
                    </table>
                </div>

                <ModalCommon
                    showModal={this.state.qrModalOpen}
                    onHide={() => this.closeQrModal()}
                    className="modal-security"
                >
                    <div className="row">
                        <div className="text-center mobile-center">
                            <div className="article"><QRCode value={this.state.qrAddress} size={250} /></div>
                            <div className="article">
                                <CopyToClipboard
                                    className="wallets__action wallets__action_modal"
                                    text={this.state.qrAddress}
                                    dispatch={this.props.dispatch}
                                    message={{
                                        type: 'success',
                                        message: 'Copied: ' + this.state.qrAddress,
                                        timeout: 500,
                                    }}
                                >
                                    {this.state.qrAddress}
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div>
                </ModalCommon>
            </ProfileWithSidebar>
        );
    }
}

WalletsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    WalletsPage: makeSelectWalletsPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsPage);
