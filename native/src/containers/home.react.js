import React, {View, Text} from 'react-native';
import PureComponent from '../components/component.react';

// Actions
import {toggleMenu} from '../app/actions';

// Components
import Header from '../components/header.react';

// Style
import * as style from '../app/app.style';

export default class Home extends PureComponent {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {
      dispatch,
      msg: {home: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          menuButtonAction={_ => dispatch(toggleMenu())}
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
