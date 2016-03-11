import Component from 'react-pure-render/component';
import React, { Text, View } from 'react-native';
import appStyles from '../app/styles';
import { FormattedMessage, defineMessages } from 'react-intl';

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

export default class Page extends Component {

  render() {
    return (
      <View style={[appStyles.centeredView, { paddingBottom: 64 }]}>
        <Text style={[appStyles.centered, appStyles.paragraph]}>
          <FormattedMessage {...messages.intro}>{formattedMessage =>
            <Text>{formattedMessage}</Text>
          }</FormattedMessage>
        </Text>
      </View>
    );
  }

}
