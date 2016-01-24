import Component from 'react-pure-render/component';
import React, {PropTypes, Text, View} from 'react-native';
import appStyles from '../app/styles';

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const {msg} = this.props;

    return (
      <View style={[appStyles.centeredView, {paddingBottom: 64}]}>
        <Text style={[appStyles.centered, appStyles.paragraph]}>
          {msg.home.iosInfoText}
        </Text>
      </View>
    );
  }

}
