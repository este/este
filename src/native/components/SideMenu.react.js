import Component from '../components/Component.react';
import React, {PropTypes, StatusBarIOS} from 'react-native';
import ReactNativeSideMenu from 'react-native-side-menu';

// Workaround for imperative react-native-side-menu api.
export default class SideMenu extends Component {

  static propTypes = {
    ...ReactNativeSideMenu.propTypes,
    children: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    platform: PropTypes.string.isRequired
  }

  componentDidUpdate(prevProps) {
    const {isOpen, platform} = this.props;
    if (prevProps.isOpen === isOpen) return;
    if (this.props.isOpen) {
      // Handle platform specific behavior.
      if (platform === 'ios')
        StatusBarIOS.setHidden(true, true);
      this.sideMenu.openMenu();
    }
    else {
      if (platform === 'ios')
        StatusBarIOS.setHidden(false, true);
      this.sideMenu.closeMenu();
    }
  }

  render() {
    return (
      <ReactNativeSideMenu ref={c => this.sideMenu = c} {...this.props}>
        {this.props.children}
      </ReactNativeSideMenu>
    );
  }

}
