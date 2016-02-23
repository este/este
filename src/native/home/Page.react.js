import Component from 'react-pure-render/component';
import React, { PropTypes, Text, View } from 'react-native';
import appStyles from '../app/styles';
import { connect } from 'react-redux';

class Page extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const { msg } = this.props;

    return (
      <View style={[appStyles.centeredView, { paddingBottom: 64 }]}>
        <Text style={[appStyles.centered, appStyles.paragraph]}>
          {msg.iosInfoText}
        </Text>
      </View>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.home
}))(Page);
