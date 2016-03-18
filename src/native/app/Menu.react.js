import Component from 'react-pure-render/component';
import React, { Dimensions } from 'react-native';
import linksMessages from '../../common/app/linksMessages';
import { injectIntl, intlShape } from 'react-intl';

const {
  PropTypes, ScrollView, StyleSheet, Text, View
} = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2C',
    flex: 1,
    height: window.height,
    width: window.width * .7
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  item: {
    fontSize: 16,
    padding: 10,
    color: '#fff'
  },
  header: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10
  }
});

class Menu extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    onRouteChange: PropTypes.func.isRequired
  };

  render() {
    const { intl, onRouteChange } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.menu}
        style={styles.container}
      >
        <View>
          <Text
            onPress={() => onRouteChange('home')} // eslint-disable-line react/jsx-no-bind
            style={styles.item}
          >{intl.formatMessage(linksMessages.home)}</Text>
          <Text
            onPress={() => onRouteChange('todos')} // eslint-disable-line react/jsx-no-bind
            style={styles.item}
          >{intl.formatMessage(linksMessages.todos)}</Text>
          <Text
            onPress={() => onRouteChange('intl')} // eslint-disable-line react/jsx-no-bind
            style={styles.item}
          >{intl.formatMessage(linksMessages.intl)}</Text>
        </View>
      </ScrollView>
    );
  }

}

export default injectIntl(Menu);
