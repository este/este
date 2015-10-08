import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired
  }

  render() {
    const {msg: {app: {links: msg}}, isLoggedIn, onLogout} = this.props;

    return (
      <header>
        <h1>
          <Link to="/">{msg.home}</Link>
        </h1>
        <ul>
          <li><Link activeClassName="active" to="/todos">{msg.todos}</Link></li>
          <li><Link activeClassName="active" to="/me">{msg.me}</Link></li>
          {isLoggedIn
            ? <li><a href="/" onClick={onLogout}>{msg.logout}</a></li>
            : <li><Link activeClassName="active" to="/login">{msg.login}</Link></li>
          }
        </ul>
      </header>
    );
  }

}
