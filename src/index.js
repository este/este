import React, {Settings} from 'react-native';
import App from './containers/App';
import {reviveState} from './app/actions';

// Redux
import {Provider} from 'react-redux/native';
import store from './store';

export default class Root extends React.Component {

  static propTypes = {
    initialState: React.PropTypes.object
  }

  // @todo performance, use compose instead of willMount hook
  componentWillMount() {
    const {initialState} = this.props;

    store.dispatch(reviveState(initialState));

    store.subscribe(() => {
      const {todos, intl} = store.getState();
      Settings.set({
        state: {
          intl: {
            selectedLanguage: intl.selectedLanguage
          },
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
