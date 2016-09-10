/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from './themes/initial';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from './components';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { selectTab } from '../routing/actions';
import { showMenu } from '../../common/app/actions';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: theme.fontSizeH5 * 0.5,
    paddingVertical: theme.fontSizeH5,
  },
  tabLink: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSize,
    padding: theme.fontSize * 0.625,
  },
  selected: {
    backgroundColor: theme.bright(theme.inverseBackgroundColor),
  },
});

const TabLink = ({ children, link, selectTab, selected }) => (
  <Text
    onPress={() => selectTab(link)}
    style={[styles.tabLink, selected && styles.selected]}
  >
    {children}
  </Text>
);

TabLink.propTypes = {
  children: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  selectTab: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired,
};

let Menu = ({ currentTab, intl, selectTab, showMenu, viewer }) => {
  const onTabLinkSelectTap = (key) => {
    showMenu(false);
    selectTab(key);
  };
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
        <TabLink
          key={link}
          selected={link === currentTab}
          link={link}
          selectTab={key => onTabLinkSelectTap(key)}
        >
          {intl.formatMessage(linksMessages[link])}
        </TabLink>
      )}
    </ScrollView>
  );
};

Menu.propTypes = {
  currentTab: React.PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  selectTab: React.PropTypes.func.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  viewer: React.PropTypes.object,
};

Menu = injectIntl(Menu);

export default connect(state => ({
  currentTab: state.routing.currentTab,
  viewer: state.users.viewer,
}), { selectTab, showMenu })(Menu);
