import './app.styl';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import flux from '../lib/flux';
import store from './store';
import {RouteHandler} from 'react-router';
import {createValidate} from '../validate';

import * as authActions from '../auth/actions';
import * as todosActions from '../todos/actions';

const actions = [authActions, todosActions];

@flux(store)
export default class App extends Component {

  static propTypes = {
    flux: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    users: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.createActions();
  }

  createActions() {
    const {flux, msg} = this.props;
    const validate = createValidate(msg);
    this.actions = actions.reduce((actions, {feature, create}) => {
      const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
      const featureActions = create(dispatch, validate, msg[feature]);
      return {...actions, [feature]: featureActions};
    }, {});
  }

  render() {
    const props = {...this.props, actions: this.actions};
    const {users: {viewer}, msg} = props;

    return (
      <div className="page">
        {/* Pass only what's needed. Law of Demeter ftw. */}
        <Header msg={msg} viewer={viewer} />
        <RouteHandler {...props} />
        <Footer msg={msg} />
      </div>
    );
  }

}
