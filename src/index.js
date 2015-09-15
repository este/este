import React, {Settings} from 'react-native';
import App from './app/app.react';
import {reviveState} from './app/actions';

// Redux
import {Provider} from 'react-redux/native';
import store from './store';

export default class Root extends React.Component {

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
