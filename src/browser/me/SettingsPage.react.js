import Helmet from 'react-helmet';
import React, { PureComponent } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Settings',
    id: 'me.settingsPage.title',
  },
});

export default class SettingsPage extends PureComponent {

  render() {
    return (
      <div className="settings-page">
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
