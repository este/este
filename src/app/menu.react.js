import React, {ScrollView, View, Text} from 'react-native';
import PureComponent from '../components/component.react';

// Styles
import styles from './menu.style';

export default class Menu extends PureComponent {

  static propTypes = {
    availableLanguages: React.PropTypes.array.isRequired,
    msg: React.PropTypes.object.isRequired,
    onItemSelected: React.PropTypes.func.isRequired,
    onLanguageSelected: React.PropTypes.func.isRequired
  }

  render() {
    const pages = ['home', 'todos'];
    const {
      msg,
      availableLanguages,
      onItemSelected,
      onLanguageSelected
    } = this.props;

    return (
      <ScrollView style={styles.menu}>
        {pages.map(page => (
          <Text key={page} onPress={_ => onItemSelected(page)} style={styles.item}>
            {msg[page]}
          </Text>
        ))}

        <View>
          <Text>{msg.selectLanguage}</Text>
          <View>
            {availableLanguages.map(lang => (
              <Text key={lang} onPress={_ => onLanguageSelected(lang)} style={styles.item}>
                {lang}
              </Text>
            ))}
          </View>
        </View>

      </ScrollView>
    );
  }

}
