import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import Footer from './footer.react';
import Menu from './menu.react';
import React from 'react';
import persistState from './persiststate.react';
import {RouteHandler} from 'react-router';

// Remember to import all app stores here.
import '../auth/store';
import '../todos/store';
import '../users/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    return {
      auth: state.authCursor(),
      pendingActions: state.pendingActionsCursor(),
      todos: state.todosCursor(),
      users: state.usersCursor(),
      viewer: state.usersCursor().get('viewer')
    };
  }

  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    state.state.on('change', () => {
      if ('production' !== process.env.NODE_ENV)
        console.time('app render'); // eslint-disable-line no-console
      this.setState(this.getState(), () => {
        if ('production' !== process.env.NODE_ENV)
          console.timeEnd('app render'); // eslint-disable-line no-console
      });
    });
  }

  render() {
    return (
      <div className="page">
        <Menu viewer={this.state.viewer} />
        <RouteHandler {...this.state} />
        <Footer />
      </div>
    );
  }

}

App = persistState(App);

export default App;
