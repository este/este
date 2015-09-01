import Component from '../components/component.react';
import React, {View, Text} from 'react-native';
import Header from '../components/header.react';

import * as style from '../app/app.style';

export default class Home extends Component {

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
