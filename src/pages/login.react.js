import Component from '../components/component.react';
import Header from '../components/header.react';
import React from 'react-native';
import {
  View
} from 'react-native';
import {msg} from '../intl/store';

import style from './home.style';

class Login extends Component {

  render() {
    return (
      <View style={style.container}>
        <Header
          navigation={this.props.navigation}
          title={msg('auth.title')}
        />
      </View>
    );
  }

}

Login.propTypes = {
  navigation: React.PropTypes.object
};

export default Login;
