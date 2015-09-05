import './app.styl';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import createActions from './createactions';
import flux from '../lib/flux';
import store from './store';
import {RouteHandler} from 'react-router';

@flux(store)
@createActions
export default class App extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  render() {
    const {users: {viewer}, msg} = this.props;

    return (
      <div className="page">
        <Header msg={msg} viewer={viewer} />
        <RouteHandler {...this.props} />
        <Footer msg={msg} />
      </div>
    );
  }

}
