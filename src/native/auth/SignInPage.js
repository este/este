// @flow
import type { State, User } from '../../common/types';
import Email from './Email';
import React from 'react';
import Social from './Social';
import { Redirect } from 'react-router';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

type SignInPageProps = {
  location: Object,
  viewer: User,
};

const SignInPage = (
  {
    location,
    viewer,
  }: SignInPageProps,
) =>
  viewer
    ? <Redirect
        to={
          (location.state &&
            location.state.from &&
            location.state.from.pathname) ||
            '/'
        }
      />
    : <ScrollView>
        <Email />
        <Social />
      </ScrollView>;

export default connect((state: State) => ({
  viewer: state.users.viewer,
}))(SignInPage);
