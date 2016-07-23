import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import SignIn from '../auth/SignIn.react';
import SignOut from '../auth/SignOut.react';
import { CenteredContainer, Text } from '../app/components';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';

class MePage extends Component {

  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    const { viewer } = this.props;
    if (!viewer) {
      return (
        <CenteredContainer>
          <SignIn />
        </CenteredContainer>
      );
    }

    const { displayName, photoURL } = viewer;
    return (
      <CenteredContainer>
        <View>
          <Text>{displayName}</Text>
        </View>
        {/* TODO: Use react-native-avatar-gravatar for email auth provider. */}
        <Image
          source={{ uri: photoURL }}
          style={{ height: 100, margin: 20, width: 100 }}
        />
        <SignOut />
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
