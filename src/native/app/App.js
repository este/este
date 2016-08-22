/* @flow */
import Menu from './Menu';
import Navigator from './Navigator';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Container } from './components';
import { connect } from 'react-redux';
import { showMenu } from '../../common/app/actions';

class App extends React.Component {

  static propTypes = {
    menuShown: React.PropTypes.bool.isRequired,
    routes: React.PropTypes.object.isRequired,
    showMenu: React.PropTypes.func.isRequired,
    storageLoaded: React.PropTypes.bool.isRequired,
  };

  render() {
    const { menuShown, routes, showMenu, storageLoaded } = this.props;
    if (!storageLoaded) return null;

    return (
      <Container inverse>
        <SideMenu
          isOpen={menuShown}
          menu={<Menu />}
          onChange={showMenu}
        >
          <Navigator routes={routes} />
        </SideMenu>
      </Container>
    );
  }

}

App = start(App);

export default connect(state => ({
  menuShown: state.app.menuShown,
  storageLoaded: state.app.storageLoaded,
}), { showMenu })(App);
