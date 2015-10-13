import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import style from '../app/App.style';

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  }

  render() {
    const {msg} = this.props;

    return (
      <View style={[style.centeredView, {paddingBottom: 64}]}>
        <Text style={[style.centered, style.paragraph]}>
          {msg.home.iosInfoText}
        </Text>
      </View>
    );
  }

}
