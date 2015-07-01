import Component from '../components/component.react';
import React from 'react-native';
import Header from '../components/header.react';
import {msg} from '../intl/store';
import {
  View,
  Text
} from 'react-native';

import style from './todos.style';
import {paragraph, centered} from '../app/app.style';

class Home extends Component {

  render() {
    const {navigation} = this.props;
    return (
      <View style={style.container}>
        <Header
          navigation={navigation}
          title={msg('home.title')}
        />
        <View style={style.centeredView}>
          <Text style={[centered, paragraph]}>{msg('home.text')}</Text>
        </View>
      </View>
    );
  }

}

Home.propTypes = {
  navigation: React.PropTypes.object.isRequired
};

export default Home;
