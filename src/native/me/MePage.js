import React from 'react';
import SignOut from '../auth/SignOut';
import gravatar from 'gravatar-api';
import { CenteredContainer, Text } from '../app/components';
import { Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { selectTab } from '../routing/actions';

const styles = StyleSheet.create({
  image: {
    height: 100,
    margin: 20,
    width: 100,
  },
});

class MePage extends React.Component {

  static propTypes = {
    selectTab: React.PropTypes.func.isRequired,
    viewer: React.PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ selectTab, viewer }) {
    if (viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    selectTab('home');
  }

  render() {
    const { viewer } = this.props;
    if (!viewer) return null;
    const { displayName, photoURL } = viewer;
    const uri = photoURL || gravatar.imageUrl({
      email: displayName,
      parameters: {
        default: 'retro',
        rating: 'x',
        size: 100,
      },
      secure: true,
    });

    return (
      <CenteredContainer>
        <View>
          <Text>{displayName}</Text>
        </View>
        <Image
          source={{ uri }}
          style={styles.image}
        />
        <SignOut />
      </CenteredContainer>
    );
  }

}

MePage = connect(state => ({
  viewer: state.users.viewer,
}), { selectTab })(MePage);

export default MePage;
