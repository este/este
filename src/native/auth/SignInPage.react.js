import Component from 'react-pure-render/component';
import React from 'react';
import Social from './Social.react';
import { View } from 'react-native';

export default class SignInPage extends Component {

  render() {
    return (
      <View>
        {/* TODO: Style it. */}
        <Social />
      </View>
    );
  }

}
