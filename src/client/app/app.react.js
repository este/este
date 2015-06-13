import './app.styl';
import * as appState from '../state';
import Component from '../components/component.react';
import Menu from './menu.react';
import React from 'react';
import exposeRouter from '../components/exposerouter.react';
import {FormattedHTMLMessage} from 'react-intl';
import {RouteHandler} from 'react-router';
import {msg} from '../intl/store';

// Remember, anytime you create a new store, you have to import it here.
// Why? Because stores are state-less reducers and mappers, therefore not
// necessarily required by any another module.
import '../auth/store';
import '../todos/store';
import '../user/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    return {
      app: appState.appCursor(),
      auth: appState.authCursor(),
      isLoggedIn: appState.userCursor().get('isLoggedIn'),
      pendingActions: appState.pendingActionsCursor(),
      todos: appState.todosCursor(),
      user: appState.userCursor()
    };
  }

  // This method is not called on the server.
  componentDidMount() {
    document.addEventListener('keypress', this.onDocumentKeypress);

    appState.state.on('change', () => {
      console.time('app render'); // eslint-disable-line no-console
      this.setState(this.getState(), () => {
        console.timeEnd('app render'); // eslint-disable-line no-console
      });
    });

    this.maybeRedirectAfterClientSideAuth();
  }

  // For Firebase and similar client side only auths. Flow: Server automatically
  // redirects unauth users to path defined in requireAuth component. Then user
  // is authenticated in browser, then redirected to originally requested path.
  maybeRedirectAfterClientSideAuth() {
    const nextPath = this.props.router.getCurrentQuery().nextPath;
    if (nextPath && this.state.isLoggedIn)
      this.props.router.replaceWith(nextPath);
  }

  onDocumentKeypress(e) {
    // Press ctrl+shift+s to save app state, and ctrl+shift+l to load.
    if (!e.ctrlKey || !e.shiftKey) return;
    const state = appState.state;
    switch (e.keyCode) {
      case 19:
        window._appState = state.save();
        window._appStateString = JSON.stringify(window._appState);
        /*eslint-disable no-console */
        console.log('App state saved.');
        console.log('To report error, type copy(_appStateString) and press enter.');
        console.log('To debug app state, type _appState and press enter.');
        /*eslint-enable */
        break;
      case 12:
        const stateStr = window.prompt('Paste the serialized state into the input'); // eslint-disable-line no-alert
        const newState = JSON.parse(stateStr);
        if (!newState) return;
        state.load(newState);
        break;
    }
  }

  render() {
    return (
      <div className="page">
        <Menu isLoggedIn={this.state.isLoggedIn} />
        <RouteHandler {...this.state} />
        <footer>
          <p>
            <FormattedHTMLMessage message={msg('app.madeByHtml')} />
          </p>
        </footer>
      </div>
    );
  }

}

App.propTypes = {
  router: React.PropTypes.func
};

export default exposeRouter(App);
