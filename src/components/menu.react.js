import SideMenu from 'react-native-side-menu';
import React from 'react-native';

export default class Menu extends SideMenu {

  static propTypes = {
    ...SideMenu.propTypes,
    disableGestures: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool])
  }

  constructor(props) {
    super(props);
    this.isOpen = this.props.isOpen;
  }

  componentWillReceiveProps(props) {
    if (super.componentWillReceiveProps) super.componentWillReceiveProps(props);
    if (this.props.isOpen !== props.isOpen)
      this.toggleMenu();
  }

}
