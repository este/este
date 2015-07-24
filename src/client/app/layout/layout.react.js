import React from 'react';
import Component from '../../components/component.react';
import {RouteHandler} from 'react-router';
import './layout.scss';
import AppLeftNav from './app-left-nav.react';
import Footer from './footer.react';
import {AppBar} from 'material-ui';
import requireAuth from '../../auth/requireauth.react';
import {initSocket} from '../../libs/listenSockets';

@requireAuth
class Layout extends Component {
   /* static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired
    };*/

    constructor(props) {
        super(props);
        initSocket();
    }

    render() {
        return (
            <div className="page">
                <AppBar title='Vamos' onLeftIconButtonTouchTap={::this._onLeftIconButtonTouchTap} />
                <AppLeftNav ref="appLeftNav" />
                <div className="page-container">
                    <RouteHandler {...this.props} />
                </div>
                <Footer />
            </div>
        );
    }

    _onLeftIconButtonTouchTap() {
        this.refs.appLeftNav.toggle();
    }
}

export default Layout;
