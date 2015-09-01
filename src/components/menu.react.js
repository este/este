import SideMenu from 'react-native-side-menu';

export default class Menu extends SideMenu {

  static propTypes = {
    ...SideMenu.propTypes
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
