import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import SignOut from '../auth/SignOut.react';
import routes from '../routes';
import { CenteredContainer, Text } from '../app/components';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';

class MePage extends Component {

  static propTypes = {
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ navigator, viewer }) {
    if (viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    navigator.replace(routes.home);
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) return null;
    const { displayName, photoURL } = viewer;

    return (
      <CenteredContainer>
        <View>
          <Text>{displayName}</Text>
        </View>
        {photoURL ?
          <Image
            source={{ uri: photoURL }}
            style={{ height: 100, margin: 20, width: 100 }}
          />
        :
          // TODO: Add gravatar, remember the displayName is the email.
          <View style={{ margin: 20 }} />
        }
        <SignOut />
      </CenteredContainer>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(MePage);
