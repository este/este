/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Block, Title, View } from '../app/components';

const ProfilePage = () => (
  <View>
    <Title message={linksMessages.profile} />
    <Block>
      <FormattedMessage {...linksMessages.profile} />
    </Block>
  </View>
);

export default ProfilePage;
