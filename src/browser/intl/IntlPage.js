// @flow
import React from 'react';
import SwitchLocale from './SwitchLocale';
import linksMessages from '../../common/app/linksMessages';
import { Box, PageHeader, Paragraph, Text } from '../../common/components';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  FormattedRelative,
  defineMessages,
} from 'react-intl';
import { Title } from '../components';

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
  const renderedAt = Date.now();
  const unreadCount = 123;

  return (
    <Box>
      <Title message={linksMessages.intl} />
      <PageHeader heading="react-intl" />
      <SwitchLocale />
      <Paragraph>
        <FormattedDate
          day="numeric"
          month="short"
          value={renderedAt}
          year="numeric"
        />
      </Paragraph>
      <Paragraph flexDirection="row">
        <FormattedNumber value={unreadCount}>
          {message => <Text>{message}</Text>}
        </FormattedNumber>
        &nbsp;
        <FormattedMessage {...messages.unreadCount} values={{ unreadCount }}>
          {message => <Text>{message}</Text>}
        </FormattedMessage>
      </Paragraph>
      <Paragraph>
        <FormattedRelative
          initialNow={renderedAt}
          updateInterval={1000 * 1}
          value={renderedAt}
        />
      </Paragraph>
    </Box>
  );
};

export default IntlPage;
