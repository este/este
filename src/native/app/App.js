/* @flow */
import Header from './Header';
import Menu from './Menu';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import withRouting from '../routing/withRouting';
import { Alert, Container } from './components';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { showMenu } from '../../common/app/actions';

let App = ({
  currentTab,
  intl,
  menuShown,
  routing,
  showMenu,
  storageLoaded,
}) => {
  // TODO: Add splash screen.
  if (!storageLoaded) return null;
  const route = routing.routes.get(currentTab);
  return (
    <Container inverse>
      {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
        <StatusBar hidden={menuShown} />
      }
      <SideMenu
        isOpen={menuShown}
        menu={<Menu />}
        onChange={showMenu}
      >
        <Container>
          <Header title={intl.formatMessage(route.title)} />
          <Alert />
          <route.Component />
        </Container>
      </SideMenu>
    </Container>
  );
};

App.propTypes = {
  currentTab: React.PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  menuShown: React.PropTypes.bool.isRequired,
  routing: React.PropTypes.object.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  storageLoaded: React.PropTypes.bool.isRequired,
};

App = injectIntl(App);

App = withRouting(App);

App = connect(state => ({
  currentTab: state.routing.currentTab,
  menuShown: state.app.menuShown,
  storageLoaded: state.app.storageLoaded,
}), { showMenu })(App);

export default start(App);
