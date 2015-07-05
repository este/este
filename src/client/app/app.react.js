import './app.styl';
import * as state from '../state';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import {RouteHandler} from 'react-router';
import {measureRender} from '../console';

// Remember to import all app stores here.
import '../auth/store';
import '../examples/store';
import '../todos/store';
import '../users/store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    const viewer = state.usersCursor().get('viewer');
    return state.appState.get().merge({
      isLoggedIn: !!viewer,
      viewer: viewer
    }).toObject();
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/este/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    state.appState.on('change', () => {
      measureRender(done => this.setState(this.getState(), done));
    });
  }

  render() {
    return (
      <div className="page">
        <Header isLoggedIn={this.state.isLoggedIn} />
        <RouteHandler {...this.state} />
        <Footer />
      </div>
    );
  }

}

export default App;
