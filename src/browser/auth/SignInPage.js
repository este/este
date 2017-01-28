// @flow
import type { State, User } from '../../common/types';
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import linksMessages from '../../common/app/linksMessages';
import { Box, Loading, PageHeader } from '../../common/components';
import { Redirect } from 'react-router';
import { Title } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

type SignInPageProps = {
  disabled: boolean,
  intl: $IntlShape,
  // location: any,
  viewer: User,
};

const SignInPage = ({
  disabled,
  intl,
  // location,
  viewer,
}: SignInPageProps) => (
  viewer ?
    <Redirect
      // TODO: Fix redirect, probably with upcoming react-navigation.
      to="/"
      // to={(
      //   location.state &&
      //   location.state.from &&
      //   location.state.from.pathname
      // ) || '/'}
    />
  :
    <Box>
      <Title message={linksMessages.signIn} />
      <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />
      <Social />
      <Email />
      <SignInError />
      {disabled &&
        <Loading marginVertical={1} />
      }
    </Box>
);

export default compose(
  connect(
    (state: State) => ({
      disabled: state.auth.formDisabled,
      viewer: state.users.viewer,
    }),
  ),
  injectIntl,
)(SignInPage);
