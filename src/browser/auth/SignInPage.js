/* @flow */
import Email from './Email';
import React from 'react';
import SignInError from './SignInError';
import Social from './Social';
import linksMessages from '../../common/app/linksMessages';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import {
  Block,
  Loading,
  Message,
  PageHeader,
  Title,
  View,
} from '../app/components';

let SignInPage = ({ disabled, intl, location, viewer }) => (
  viewer ?
    <Redirect
      to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
    />
  :
    <View>
      <Title message={linksMessages.signIn} />
      <PageHeader heading={intl.formatMessage(linksMessages.signIn)} />
      <Block>
        <Social />
      </Block>
      <Block>
        <Email />
      </Block>
      <SignInError />
      {disabled &&
        <Loading>
          {message => <Message>{message}</Message>}
        </Loading>
      }
    </View>
);

SignInPage.propTypes = {
  disabled: React.PropTypes.bool.isRequired,
  intl: intlShape,
  location: React.PropTypes.object.isRequired,
  viewer: React.PropTypes.object,
};

SignInPage = injectIntl(SignInPage);

export default connect(state => ({
  disabled: state.auth.formDisabled,
  viewer: state.users.viewer,
}))(SignInPage);
