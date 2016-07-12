import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import appStyles from '../app/styles';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class OfflinePage extends Component {

  static propTypes = {
    online: PropTypes.bool.isRequired,
  };

  render() {
    const { online } = this.props;

    return (
      <View style={[appStyles.centeredView, { paddingBottom: 64 }]}>
        <View>
          <Text>state.app.online: {online.toString()}</Text>
        </View>
      </View>
    );
  }

}

export default connect(state => ({
  online: state.app.online,
}))(OfflinePage);
