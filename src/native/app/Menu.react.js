import React, { Component, PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from './theme';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from './components';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { selectTab } from '../routing/actions';
import { showMenu } from '../../common/app/actions';

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: theme.fontSizeH5 * .5,
    paddingVertical: theme.fontSizeH5,
  },
  tabLink: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSize,
    padding: theme.fontSize * .625,
  },
  selected: {
    backgroundColor: theme.light(theme.inverseBackgroundColor),
  },
});

// Note patern, stateless component with arrow function.
// github.com/airbnb/javascript/issues/801#issuecomment-230848043
const TabLink = ({ children, link, selectTab, selected }) => (
  <Text
    onPress={() => selectTab(link)}
    style={[styles.tabLink, selected && styles.selected]}
  >
    {children}
  </Text>
);

TabLink.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

class Menu extends Component {

  static propTypes = {
    currentTab: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    selectTab: PropTypes.func.isRequired,
    showMenu: PropTypes.func.isRequired,
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.onTabLinkSelectTap = this.onTabLinkSelectTap.bind(this);
  }

  onTabLinkSelectTap(key) {
    const { selectTab, showMenu } = this.props;
    showMenu(false);
    selectTab(key);
  }

  render() {
    const { currentTab, intl, viewer } = this.props;
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
            selectTab={this.onTabLinkSelectTap}
          >
            {intl.formatMessage(linksMessages[link])}
          </TabLink>
        )}
      </ScrollView>
    );
  }

}

Menu = injectIntl(Menu);

export default connect(state => ({
  currentTab: state.routing.currentTab,
  viewer: state.users.viewer,
}), { selectTab, showMenu })(Menu);
