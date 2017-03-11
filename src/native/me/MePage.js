// @flow
import type { State, User } from '../../common/types';
import React from 'react';
import SignOut from '../auth/SignOut';
import getUserPhotoUrl from '../../common/users/getUserPhotoUrl';
import { Box, Text } from '../../common/components';
import { Image } from 'react-native';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

type MePageProps = {
  viewer: ?User,
};

const MePage = (
  {
    viewer,
  }: MePageProps,
) =>
  !viewer
    ? <Redirect to="/" />
    : <Box alignItems="center">
        <Text marginTop={4} size={1}>
          {viewer.displayName}
        </Text>
        <Box
          as={Image}
          source={{ uri: getUserPhotoUrl(viewer) }}
          width={4}
          height={4}
          marginVertical={2}
        />
        <SignOut />
      </Box>;

export default connect((state: State) => ({
  viewer: state.users.viewer,
}))(MePage);
