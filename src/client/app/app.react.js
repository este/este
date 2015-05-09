import DocumentTitle from 'react-document-title';
import React from 'react';
import {RouteHandler} from 'react-router';
import '../user/store';
import {state} from '../state';
import Menu from './menu.react';
import PureComponent from '../components/purecomponent.react';

// Leverage webpack require goodness for feature toggle based dead code removal.
require('./app.styl');

export default class App extends PureComponent {

  constructor() {
    super();
    this.state = {app: state.get()};
  }

  componentDidMount() {
    // Must be required here because there is no DOM in Node.js. Remember,
    // mocking DOM in Node.js is an anti-pattern, because it can confuse
    // isomorphic libraries. TODO: Wait for iOS fix, then remove.
    // http://developer.telerik.com/featured/300-ms-click-delay-ios-8/
    require('fastclick').attach(document.body);

    state.on('change', () => {
      this.setState({app: state.get()});
    });
  }

  render() {
    return (
      <DocumentTitle title='Este.js App'>
        <div className="page">
          <Menu isLoggedIn={!!this.state.app.getIn(['user','authData'])} />
          <RouteHandler appState={this.state.app} />
          <footer>
            <p>
              made by <a href="https://twitter.com/steida">steida</a>
            </p>
          </footer>
        </div>
      </DocumentTitle>
    );
  }

}
