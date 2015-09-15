// Polyfill the things
import './src/lib/polyfill.js';
import './node_modules/intl/index.js';
import './node_modules/intl/locale-data/jsonp/en.js';
import React, {AppRegistry, Settings} from 'react-native';
import App from './src/app/app.react';
import {reviveState} from './src/app/actions';

// Redux
import {Provider} from 'react-redux/native';
import store from './src/store';

class Root extends React.Component {

  static propTypes = {
    initialState: React.PropTypes.object
  }

  componentWillMount() {
    const {initialState} = this.props;

    store.dispatch(reviveState(initialState));

    store.subscribe(() => {
      const {todos} = store.getState();
      Settings.set({
        state: {
          todos: todos.toJS()
        }
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }

};

AppRegistry.registerComponent('este', () => Root);
