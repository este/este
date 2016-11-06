import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../common/app/actions';
import { Link } from 'react-router';
import { colors } from '../styles';

@connect(null, { toggleMenu })
export default class Menu extends Component {

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
        <div>
          <ul style={style.menu}>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/login">Přihlásit se</Link></li>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/search">Vyhledat film</Link></li>
            <li style={style.menu.item}><Link style={style.menu.item.link} to="/program">Program</Link></li>
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
