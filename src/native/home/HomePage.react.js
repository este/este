import Component from 'react-pure-render/component';
import React from 'react';
import appStyles from '../app/styles';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Text, View } from 'react-native';

const messages = defineMessages({
  intro: {
    defaultMessage: `
      Este App
      Press CMD+R to reload
      Press CMD+D for debug menu
    `,
    id: 'home.native.intro'
  }
});

export default class HomePage extends Component {

  render() {
    return (
      <View style={[appStyles.centeredView, { paddingBottom: 64 }]}>
        <Text style={[appStyles.centered, appStyles.paragraph]}>
          <FormattedMessage {...messages.intro}>
            {message => <Text>{message}</Text>}
          </FormattedMessage>
        </Text>
      </View>
    );
  }

}
