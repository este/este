import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from '../../common/app/theme';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from './components';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  menu: {
    backgroundColor: theme.inverseBackgroundColor,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: theme.fontSizeH5,
    paddingHorizontal: theme.fontSizeH5,
  },
  item: {
    fontSize: theme.fontSize,
    padding: theme.fontSize * .625,
    color: theme.inverseTextColor,
  },
});

class Menu extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    onRouteChange: PropTypes.func.isRequired,
    viewer: PropTypes.object,
  };

  render() {
    const { intl, onRouteChange, viewer } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.content}
        style={styles.menu}
      >
        <View>
          {/* TODO: Refactor */}
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
          <Text
            onPress={() => onRouteChange('offline')} // eslint-disable-line react/jsx-no-bind
            style={styles.item}
          >{intl.formatMessage(linksMessages.offline)}</Text>
          {viewer ?
            <Text
              onPress={() => onRouteChange('me')} // eslint-disable-line react/jsx-no-bind
              style={styles.item}
            >{intl.formatMessage(linksMessages.me)}</Text>
          :
            <Text
              onPress={() => onRouteChange('signIn')} // eslint-disable-line react/jsx-no-bind
              style={styles.item}
            >{intl.formatMessage(linksMessages.signIn)}</Text>
          }
        </View>
      </ScrollView>
    );
  }

}

Menu = injectIntl(Menu);

export default connect(state => ({
  viewer: state.users.viewer,
}))(Menu);
