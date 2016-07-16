import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import SignOut from '../auth/SignOut.react';
import Social from '../auth/Social.react';
import appStyles from '../app/styles';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

class MePage extends Component {

  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    const { viewer } = this.props;
    // TODO: Add native redirect to home in signOut action.
    if (!viewer) return <Social />;
    const { displayName, photoURL } = viewer;

    return (
      <View style={appStyles.centeredView}>
        <View style={{ marginTop: 64 }}>
          <Text>{displayName}</Text>
        </View>
        {/* TODO: Use react-native-avatar-gravatar for email auth provider. */}
        <Image
          source={{ uri: photoURL }}
          style={{ height: 100, margin: 20, width: 100, }}
        />
        <SignOut />
      </View>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
