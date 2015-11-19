import './App.styl';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';

// // logRenderTime is useful for app with huge UI to check render performance.
// import logRenderTime from '../lib/logRenderTime';

@connect(mapStateToProps, mapDispatchToProps)
// @logRenderTime
export default class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    persistence: PropTypes.object.isRequired
  }

  render() {
    const {
      actions: {logout},
      persistence: {authToken},
      location: {pathname},
      msg
    } = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={pathname}>
        <Helmet
          meta={[{
            name: 'description',
            content: 'Dev stack and starter kit for functional and universal React web apps'
          }]}
          titleTemplate="%s - Este.js"
        />
        {/* Pathname enforces rerender so activeClassName is updated. */}
        <Header
          isLoggedIn={!!authToken}
          msg={msg}
          onLogout={logout}
          pathname={pathname}
        />
        <RouterHandler {...this.props} />
        <Footer msg={msg.app.footer} />
      </div>
    );
  }

}
