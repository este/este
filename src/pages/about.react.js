import Component from '../components/component.react';
import React from 'react-native';
import Header from '../components/header.react';
import {msg} from '../intl/store';
import {
  View,
  Text
} from 'react-native';

import style from './todos.style';

class About extends Component {

  render() {
    const {navigation} = this.props;
    return (
      <View style={style.container}>
        <Header
          navigation={navigation}
          title={msg('home.title')}
        />
      <Text onPress={_ => navigation.transitionTo('about')}>TET</Text>
      </View>
    );
  }

}

About.propTypes = {
  navigation: React.PropTypes.object.isRequired
};

export default About;
