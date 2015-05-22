import Component from '../components/component.react';
import React from 'react';
import {Link} from 'react-router';
import {FormattedHTMLMessage} from 'react-intl';
import {msg} from '../intl/store';

class Menu extends Component {

  render() {
    return (
      <header>
        <h1>
          <FormattedHTMLMessage message={msg('menu.headerHtml')} />
        </h1>
        <ul>
          <li><Link to="home">{msg('menu.home')}</Link></li>
          <li><Link to="todos">{msg('menu.todos')}</Link></li>
          <li><Link to="me">{msg('menu.me')}</Link></li>
          {/* Note simple rule: Never put HTML and JS into the same line.*/}
          {!this.props.isLoggedIn &&
            <li><Link to="login">{msg('menu.login')}</Link></li>
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
