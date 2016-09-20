/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import messages from '../../common/notfound/messages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link, PageHeader, Title, View } from '../app/components';

const NotFoundPage = ({ intl }) => (
  <View>
    <Title message={linksMessages.notFound} />
    <PageHeader
      description={intl.formatMessage(messages.p)}
      heading={intl.formatMessage(messages.h1)}
    />
    <Link exactly to="/">
      <FormattedMessage {...messages.continue} />
    </Link>
  </View>
);

NotFoundPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NotFoundPage);
