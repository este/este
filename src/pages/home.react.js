import Component from '../components/component.react';
import Header from '../components/header.react';
import React from 'react-native';
import requireAuth from '../auth/requireauth.react';
import {
  View,
  Text
} from 'react-native';
import {msg} from '../intl/store';

import style from './home.style';

class Home extends Component {

  render() {
    return (
      <View style={style.container}>

        <Header
          navigation={this.props.navigation}
          showMenuButton={true}
          title={msg('home.title')}
        />

        <View style={style.centeredView}>
          <Text>{msg('home.text')}</Text>
        </View>

      </View>
    );
  }

}

Home.propTypes = {
  navigation: React.PropTypes.object
};

export default requireAuth(Home);
