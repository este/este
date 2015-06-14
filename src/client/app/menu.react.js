import Component from '../components/component.react';
import React from 'react';
import immutable from 'immutable';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {msg} from '../intl/store';

class Menu extends Component {

  render() {
    const userIsLoggedIn = !!this.props.viewer;

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
          {!userIsLoggedIn &&
            <li><Link to="login">{msg('menu.login')}</Link></li>
          }
          <li><Link to="examples">{msg('menu.examples')}</Link></li>
        </ul>
      </header>
    );
  }

}

Menu.propTypes = {
  viewer: React.PropTypes.instanceOf(immutable.Record)
};

export default Menu;
