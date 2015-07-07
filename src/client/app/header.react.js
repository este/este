import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {msg} from '../intl/store';

class Header extends Component {

  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired
  };

  render() {
    const {isLoggedIn} = this.props;

    return (
      <header>
        <h1>
          <FormattedHTMLMessage message={msg('header.h1Html')} />
        </h1>
        <ul>
          <li><Link to="home">{msg('header.home')}</Link></li>
          <li><Link to="todos">{msg('header.todos')}</Link></li>
          <li><Link to="examples">{msg('header.examples')}</Link></li>
          <li><Link to="me">{msg('header.me')}</Link></li>
          {!isLoggedIn &&
            <li><Link to="login">{msg('header.login')}</Link></li>
          }
        </ul>
      </header>
    );
  }

}

export default Header;
