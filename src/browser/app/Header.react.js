import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const messages = defineMessages({
  firebase: { defaultMessage: 'Firebase', id: 'header.links.firebase' },
  home: { defaultMessage: 'Home', id: 'header.links.home' },
  login: { defaultMessage: 'Login', id: 'header.links.login' },
  me: { defaultMessage: 'Me', id: 'header.links.me' },
  todos: { defaultMessage: 'Todos', id: 'header.links.todos' }
});

class Header extends Component {

  static propTypes = {
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props;

    return (
      <header>
        <h1>
          <Link to="/">
            <FormattedMessage {...messages.home} />
          </Link>
        </h1>
        <ul>
          <li>
            <Link activeClassName="active" to="/firebase">
              <FormattedMessage {...messages.firebase} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/todos">
              <FormattedMessage {...messages.todos} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/me">
              <FormattedMessage {...messages.me} />
            </Link>
          </li>
          {!viewer &&
            <li>
              <Link activeClassName="active" to="/login">
                <FormattedMessage {...messages.login} />
              </Link>
            </li>
          }
        </ul>
      </header>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}))(Header);
