import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  title: {
    defaultMessage: 'Profile',
    id: 'me.profilePage.title'
  }
});

class Profile extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage(messages.title);

    return (
      <div className="profile-page">
        <Helmet title={title} />
        <p>
          <FormattedMessage {...messages.title} />
        </p>
      </div>
    );
  }

}

export default injectIntl(Profile);
