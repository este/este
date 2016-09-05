/* @flow */
import Locales from './SwitchLocale';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Block, PageHeader, Text, Title, View } from '../app/components';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedRelative,
  defineMessages,
} from 'react-intl';

const messages = defineMessages({
  unreadCount: {
    defaultMessage: `{unreadCount, plural,
      one {message}
      other {messages}
    }`,
    id: 'intl.page.unreadCount',
  },
});

const IntlPage = () => {
  const componentRenderedAt = Date.now();
  const unreadCount = 123;

  return (
    <View>
      <Title message={linksMessages.intl} />
      <PageHeader heading="react-intl" />
      <Locales />
      <Block>
        <Text>
          <FormattedDate
            value={Date.now()}
            day="numeric"
            month="long"
            year="numeric"
            formatMatcher="basic" // while this bug remains in react-intl: https://github.com/andyearnshaw/Intl.js/issues/179
          />
        </Text>
        <Text>
          <FormattedNumber value={unreadCount} /> {' '}
          <FormattedMessage {...messages.unreadCount} values={{ unreadCount }} />
        </Text>
        <Text>
          <FormattedRelative
            initialNow={componentRenderedAt}
            updateInterval={1000 * 1}
            value={componentRenderedAt}
          />
        </Text>
      </Block>
    </View>
  );
};

export default IntlPage;
