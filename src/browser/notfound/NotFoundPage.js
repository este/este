import Helmet from 'react-helmet';
import React from 'react';
import messages from '../../common/notfound/messages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const NotFoundPage = () => (
  <div className="notfound-page">
    <FormattedMessage {...messages.title}>
      {message =>
        <Helmet title={message} />
      }
    </FormattedMessage>
    <h1>
      <FormattedMessage {...messages.h1} />
    </h1>
    <p>
      <FormattedMessage {...messages.p} />
    </p>
    <Link to="/">
      <FormattedMessage {...messages.continue} />
    </Link>
  </div>
);

export default NotFoundPage;
