import Component from 'react-pure-render/component';
import React from 'react';
import { CenteredContainer, FormattedMessage } from '../app/components';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  intro: {
    defaultMessage: `
      Este App
      Press CMD+R to reload
      Press CMD+D for debug menu
    `,
    id: 'home.native.intro',
  },
});

export default class HomePage extends Component {

  render() {
    return (
      <CenteredContainer>
        <FormattedMessage {...messages.intro} style={{ textAlign: 'center' }} />
      </CenteredContainer>
    );
  }

}
