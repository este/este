/* @flow */
import React from 'react';
import SignIn from './SignIn';
import linksMessages from '../../common/app/linksMessages';
import { PageHeader, Title, View } from '../app/components';
import { injectIntl, intlShape } from 'react-intl';
import { locationShape } from 'react-router';

const SignInPage = ({ intl, location }) => (
  <View>
    <Title message={linksMessages.signIn} />
    <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />
    <SignIn location={location} />
  </View>
);

SignInPage.propTypes = {
  intl: intlShape,
  location: locationShape,
};

export default injectIntl(SignInPage);
