import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { colors } from '../styles';
import { connect } from 'react-redux';
import { toggleMenu } from '../../common/app/actions';
import { Link } from 'react-router';

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
        <Link to="/" style={style.logo}>logo</Link>
        <div style={style.menuToggle} onClick={() => this.toggleMenu()}>menu</div>
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
    backgroundColor: colors.secondary,
    float: 'left'
  },
  menuToggle: {
    height: '100%',
    width: '70px',
    backgroundColor: colors.secondary,
    float: 'right',
    marginRight: '20px'
  }
};
