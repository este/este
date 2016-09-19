/* @flow */
import Header from './Header';
import Menu from './Menu';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import linksMessages from '../../common/app/linksMessages';
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

let AppHeader = ({ intl }) => (
  <Match
    pattern="/"
    render={({ location }) => {
      const title = {
        '/': linksMessages.home,
        '/intl': linksMessages.intl,
        '/offline': linksMessages.offline,
        '/signin': linksMessages.signIn,
        '/todos': linksMessages.todos,
        '/me': linksMessages.me,
      }[location.pathname];
      return (
        <Header title={intl.formatMessage(title)} />
      );
    }}
  />
);

AppHeader.propTypes = {
  intl: intlShape.isRequired,
};

AppHeader = injectIntl(AppHeader);

let App = ({
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
          <AppHeader />
          <Alert />
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/intl" component={Intl} />
          <Match pattern="/offline" component={Offline} />
          <Match pattern="/signin" component={SignIn} />
          <Match pattern="/todos" component={Todos} />
          <MatchWhenAuthorized pattern="/me" component={Me} />
          {/* It's better to render Home than 404 for unknown static page. */}
          {/* Use NotFoundPage for dynamic pages. */}
          {/* github.com/ReactTraining/react-router/issues/3905 */}
          <Miss component={Home} />
        </Container>
      </SideMenu>
    </Container>
  );
};

App.propTypes = {
  menuShown: React.PropTypes.bool.isRequired,
  showMenu: React.PropTypes.func.isRequired,
  storageLoaded: React.PropTypes.bool.isRequired,
};

App = connect(state => ({
  menuShown: state.app.menuShown,
  storageLoaded: state.app.storageLoaded,
}), { showMenu })(App);

export default start(App);
