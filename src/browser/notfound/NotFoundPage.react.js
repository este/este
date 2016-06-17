import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router';

const messages = defineMessages({
  title: {
    defaultMessage: 'Page Not Found',
    id: 'notFound.title'
  },
  h1: {
    defaultMessage: 'This page isn\'t available',
    id: 'notFound.h1'
  },
  p: {
    defaultMessage: 'The link may be broken, or the page may have been removed.',
    id: 'notFound.p'
  },
  continue: {
    defaultMessage: 'Continue here please.',
    id: 'notFound.continue'
  }
});

export default class NotFoundPage extends Component {

  render() {
    return (
      <div className="notfound-page">
        <FormattedMessage {...messages.title}>
          {message => <Helmet title={message} />}
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
  }

}
