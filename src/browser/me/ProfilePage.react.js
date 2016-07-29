import Helmet from 'react-helmet';
import React, { PureComponent } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Profile',
    id: 'me.profilePage.title',
  },
});

export default class ProfilePage extends PureComponent {

  render() {
    return (
      <div className="profile-page">
        <FormattedMessage {...messages.title}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <p>
          <FormattedMessage {...messages.title} />
        </p>
      </div>
    );
  }

}
