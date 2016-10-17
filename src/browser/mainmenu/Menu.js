import React, { PropTypes as RPT, PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../common/app/actions';

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
      <div style={style}>
        <div>
          <ul>
            <li>Přihlásit se</li>
            <li>Vyhledat film</li>
            <li>Program</li>
            <li>Novinky</li>
            <li>O nás</li>
          </ul>
        </div>
      </div>
    );
  }
}

const style = {
  position: 'absolute',
  height: '100vh',
  width: '100%',
  background: 'rgba(0,20,20,0.95)',
  top: 0,
  left: 0,
  color: 'white',
  paddingTop: '50px'
};
