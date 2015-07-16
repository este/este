import './app.styl';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import {RouteHandler} from 'react-router';
import {appState} from '../state';
import {measureRender} from '../console';

// All stores must be imported here.
import '../auth/store';
import '../examples/store';
import '../todos/store';
import '../users/store';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    const viewer = appState.get().getIn(['users', 'viewer']);
    return appState.get().merge({
      isLoggedIn: !!viewer,
      viewer: viewer
    }).toObject();
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/este/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    appState.on('change', () => {
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
