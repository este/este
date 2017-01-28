// @flow
import App from './App';
import Fela from '../../common/components/FelaProvider';
import React from 'react';
import configureFela from '../configureFela';
import { MemoryRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  store: Object,
};

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    return (
      <Redux store={store}>
        <Fela
          Button={TouchableOpacity}
          Image={Image}
          Text={Text}
          TextInput={TextInput}
          View={View}
          renderer={configureFela()}
        >
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </Fela>
      </Redux>
    );
  }

}

export default Root;
