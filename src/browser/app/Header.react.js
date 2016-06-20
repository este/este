import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
            <FormattedMessage {...linksMessages.home} />
          </Link>
        </h1>
        <ul>
          <li>
            <Link activeClassName="active" to="/firebase">
              <FormattedMessage {...linksMessages.firebase} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/todos">
              <FormattedMessage {...linksMessages.todos} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/fields">
              <FormattedMessage {...linksMessages.fields} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/intl">
              <FormattedMessage {...linksMessages.intl} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/offline">
              <FormattedMessage {...linksMessages.offline} />
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/me">
              <FormattedMessage {...linksMessages.me} />
            </Link>
          </li>
          {!viewer &&
            <li>
              <Link activeClassName="active" to="/login">
                <FormattedMessage {...linksMessages.login} />
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
