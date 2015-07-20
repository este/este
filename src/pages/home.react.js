import Component from '../components/component.react';
import React from 'react-native';
import {msg} from '../intl/store';
import {View, Text} from 'react-native';

import * as style from '../app/app.style';

export default class Home extends Component {

  render() {
    return (
      <View style={style.containerWithNavbar}>
        <View style={[style.centeredView, style.paddingBottom]}>
          <Text style={[style.centered, style.paragraph]}>{msg('home.text')}</Text>
        </View>
      </View>
    );
  }

}
