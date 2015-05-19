import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router';

class Menu extends Component {

  render() {
    return (
      <header>
        <h1>
          <a href="https://github.com/steida/este">Este.js</a> App
        </h1>
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="todos">Todos</Link></li>
          <li><Link to="me">Me (protected)</Link></li>
          {/* Note simple rule: Never put HTML and JS into the same line.*/}
          {!this.props.isLoggedIn &&
            <li><Link to="login">Login</Link></li>
          }
        </ul>
      </header>
    );
  }

}

Menu.propTypes = {
  isLoggedIn: React.PropTypes.bool
};

export default Menu;
