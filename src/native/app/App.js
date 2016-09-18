/* @flow */
import Header from './Header';
import Menu from './Menu';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Alert, Container } from './components';
import { Match, Miss } from 'react-router';
import { MatchWhenAuthorized } from '../../common/app/components';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { showMenu } from '../../common/app/actions';

// Pages
import Home from '../home/HomePage';
import Intl from '../intl/IntlPage';
import Me from '../me/MePage';
import Offline from '../offline/OfflinePage';
import SignIn from '../auth/SignInPage';
import Todos from '../todos/TodosPage';

let App = ({
  intl,
  menuShown,
  showMenu,
  storageLoaded,
}) => {
  // TODO: Add splash screen.
  if (!storageLoaded) return null;
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
          {/* <Header title={intl.formatMessage(route.title)} /> */}
          <Alert />
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/intl" component={Intl} />
          <Match pattern="/offline" component={Offline} />
          <Match pattern="/signin" component={SignIn} />
          <Match pattern="/todos" component={Todos} />
          <MatchWhenAuthorized pattern="/me" component={Me} />
          {/* It's better to render Home than 404 for unknown top page. */}
          {/* github.com/ReactTraining/react-router/issues/3905 */}
          <Miss component={Home} />
        </Container>
      </SideMenu>
    </Container>
  );
};

App.propTypes = {
  intl: intlShape.isRequired,
  menuShown: React.PropTypes.bool.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  storageLoaded: React.PropTypes.bool.isRequired,
};

App = injectIntl(App);

App = connect(state => ({
  menuShown: state.app.menuShown,
  storageLoaded: state.app.storageLoaded,
}), { showMenu })(App);

export default start(App);
