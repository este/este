/* @flow */
import type { State } from '../../common/types';
import React from 'react';
import SignOut from '../auth/SignOut';
import gravatar from 'gravatar-api';
import { CenteredContainer, Text } from '../app/components';
import { Image, StyleSheet, View } from 'react-native';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  image: {
    height: 100,
    margin: 20,
    width: 100,
  },
});

const getImageSourceUri = viewer => viewer.photoURL || gravatar.imageUrl({
  email: viewer.displayName,
  parameters: {
    default: 'retro',
    rating: 'x',
    size: 100,
  },
  secure: true,
});

const MePage = ({ viewer }) => (
  !viewer ?
    <Redirect to="/" />
  :
    <CenteredContainer>
      <View>
        <Text>{viewer.displayName}</Text>
      </View>
      <Image
        source={{ uri: getImageSourceUri(viewer) }}
        style={styles.image}
      />
      <SignOut />
    </CenteredContainer>
);

MePage.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(MePage);
