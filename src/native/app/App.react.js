import Menu from './Menu.react';
import Navigator from './Navigator.react';
import React, { Component, PropTypes } from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Container } from './components';
import { connect } from 'react-redux';
import { showMenu } from '../../common/app/actions';

class App extends Component {

  static propTypes = {
    menuShown: PropTypes.bool.isRequired,
    routes: PropTypes.object.isRequired,
    showMenu: PropTypes.func.isRequired,
    storageLoaded: PropTypes.bool.isRequired,
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
