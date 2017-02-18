// @flow
import type { State } from '../../common/types';
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import linksMessages from '../../common/app/linksMessages';
import { Box, Loading, PageHeader } from '../../common/components';
import { Title } from '../components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

type SignInPageProps = {
  disabled: boolean,
  intl: $IntlShape,
};

const SignInPage = (
  {
    disabled,
    intl,
  }: SignInPageProps,
) => (
  <Box>
    <Title message={linksMessages.signIn} />
    <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />
    <Social />
    <Email />
    <SignInError />
    {disabled && <Loading marginVertical={1} />}
  </Box>
);

export default compose(
  connect((state: State) => ({
    disabled: state.auth.formDisabled,
  })),
  injectIntl,
)(SignInPage);
