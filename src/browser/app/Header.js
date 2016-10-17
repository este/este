import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../common/app/actions';

@connect(null, { toggleMenu })
export default class Header extends Component {
  static propTypes = {
    toggleMenu: RPT.func.isRequired
  }

  toggleMenu() {
    const { toggleMenu } = this.props;
    toggleMenu();
  }

  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.logo}>logo</div>
        <div style={style.menuToggle} onClick={() => this.toggleMenu()}>menu</div>
      </div>
    );
  }
}

const style = {
  wrapper: {
    height: '50px',
    width: '100%',
    backgroundColor: 'red',
    position: 'fixed',
    top: 0,
    left: 0
  },
  logo: {
    height: '100%',
    width: '100px',
    backgroundColor: 'blue',
    float: 'left'
  },
  menuToggle: {
    height: '100%',
    width: '70px',
    backgroundColor: 'blue',
    float: 'right',
    marginRight: '20px'
  }
};
