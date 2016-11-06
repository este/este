import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { colors } from '../styles';
import { connect } from 'react-redux';
import { toggleMenu } from '../../common/app/actions';
import { Link } from 'react-router';

@connect(state => ({
  menuShown: state.app.get('menuShown')
}), { toggleMenu })
export default class Header extends Component {
  static propTypes = {
    menuShown: RPT.bool,
    toggleMenu: RPT.func.isRequired
  }

  toggleMenu() {
    const { toggleMenu } = this.props;
    toggleMenu();
  }

  render() {
    const { menuShown } = this.props;

    return (
      <div style={style.wrapper}>
        <Link to="/" style={style.logo}>app</Link>
        <div
          style={style.menuToggle}
          onClick={() => this.toggleMenu()}
        >
          {menuShown ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>
      </div>
    );
  }
}

const style = {
  wrapper: {
    height: '50px',
    width: '100%',
    backgroundColor: colors.primary,
    position: 'fixed',
    top: 0,
    left: 0
  },
  logo: {
    height: '100%',
    width: '100px',
    backgroundImage: 'url(/assets/img/logo.png)',
    backgroundSize: 'cover',
    float: 'left'
  },
  menuToggle: {
    height: '100%',
    width: '20px',
    float: 'right',
    marginRight: '20px',
    fontSize: '2.5em'
  }
};
