/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Block, Title, View } from '../app/components';
import { FormattedMessage } from 'react-intl';

const SettingsPage = () => (
  <View>
    <Title message={linksMessages.settings} />
    <Block>
      <FormattedMessage {...linksMessages.settings} />
    </Block>
  </View>
);

export default SettingsPage;
