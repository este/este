import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { logout, toggleMenu } from '../../common/app/actions';
import { Link } from 'react-router';
import { colors } from '../styles';

@connect(state => ({
  isLoggedIn: state.app.get('isLoggedIn')
}), { logout, toggleMenu })
export default class Menu extends Component {

  static propTypes = {
    isLoggedIn: RPT.bool,
    logout: RPT.func.isRequired,
    toggleMenu: RPT.func.isRequired
  }

  toggleMenu() {
    const { toggleMenu } = this.props;
    toggleMenu();
  }

  logout() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div style={style.wrapper}>
        <div>
          <ul style={style.menu}>
            {isLoggedIn
              ? <li style={style.menu.item}><Link onClick={() => this.logout()} style={style.menu.item.link} to="/">Odhlásit se</Link></li>
              : <li style={style.menu.item}><Link style={style.menu.item.link} to="/login">Přihlásit se</Link></li>
            }
            {isLoggedIn && <li style={style.menu.item}><Link style={style.menu.item.link} to="/profile">Moje rezervace</Link></li>}
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/search">Vyhledat film</Link></li>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/">Program</Link></li>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/news">Novinky</Link></li>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/about-us">O nás</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

const style = {
  wrapper: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    background: colors.secondary,
    top: 0,
    left: 0,
    paddingTop: '40px'
  },

  menu: {
    listStyleType: 'none',
    padding: 0,
    item: {
      marginTop: '10px',
      textAlign: 'center',

      link: {
        width: '100%',
        height: '100px',
        display: 'inline-block',
        backgroundColor: colors.primary,
        top: '50%',
        fontSize: '1.5em',
        color: colors.white,
        textDecoration: 'none',
        verticalAlign: 'middle'
      }
    }
  }
};
