import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Settings',
    id: 'me.settingsPage.title'
  }
});

export default class SettingsPage extends Component {

  render() {
    return (
      <div className="settings-page">
        <FormattedMessage {...messages.title}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <p>
          <FormattedMessage {...messages.title} />
        </p>
      </div>
    );
  }

}
