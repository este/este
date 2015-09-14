import React, {View, Text} from 'react-native';
import {PureComponent} from 'react-pure-render';
import Header from '../components/header.react';

import * as style from '../app/app.style';

export default class Home extends PureComponent {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {
      actions: {app: actions},
      msg: {home: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          menuButtonAction={actions.toggleMenu}
          title={msg.title}
        />

        <View style={[style.centeredView, style.paddingBottom]}>
          <Text style={[style.centered, style.paragraph]}>
            {msg.text}
          </Text>
        </View>

      </View>
    );
  }

}
