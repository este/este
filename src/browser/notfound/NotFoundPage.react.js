import Helmet from 'react-helmet';
import React, { Component } from 'react';
import messages from '../../common/notfound/messages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

export default class NotFoundPage extends Component {

  render() {
    return (
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
  }

}
