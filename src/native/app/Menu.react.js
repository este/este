import React, { Component, PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from './theme';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from './components';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: theme.fontSizeH5 * .5,
    paddingVertical: theme.fontSizeH5,
  },
  item: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSize,
    padding: theme.fontSize * .625,
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
    const links = [
      'home',
      'todos',
      'intl',
      'offline',
      (viewer ? 'me' : 'signIn'),
    ];

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.contentContainer}
      >
        {links.map(link =>
          <Text
            key={link}
            onPress={() => onRouteChange(link)} // eslint-disable-line react/jsx-no-bind
            style={styles.item}
          >{intl.formatMessage(linksMessages[link])}</Text>
        )}
      </ScrollView>
    );
  }

}

Menu = injectIntl(Menu);

export default connect(state => ({
  viewer: state.users.viewer,
}))(Menu);
