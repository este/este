/* @flow */
import React from 'react';
import SignIn from './SignIn';
import linksMessages from '../../common/app/linksMessages';
import { PageHeader, Title, View } from '../app/components';
import { injectIntl, intlShape } from 'react-intl';

const SignInPage = ({ intl }) => (
  <View>
    <Title message={linksMessages.signIn} />
    <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />
    {/* <SignIn location={location} /> */}
  </View>
);

SignInPage.propTypes = {
  intl: intlShape,
};

export default injectIntl(SignInPage);
