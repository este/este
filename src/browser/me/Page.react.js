import './Page.scss';
import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Page extends Component {

  static propTypes = {
    children: PropTypes.object,
    msg: PropTypes.object,
    viewer: PropTypes.object
  };

  render() {
    const {children, msg, viewer: {email}} = this.props;

    return (
      <div className="me-page">
        <Helmet title={msg.me.title} />
        <ul>
          <li><Link activeClassName="active" to="/me/profile">{msg.profile.title}</Link></li>
          <li><Link activeClassName="active" to="/me/settings">{msg.settings.title}</Link></li>
        </ul>
        {children ||
          <p>
            <FormattedMessage
              defaultMessage={msg.me.welcome}
              id={'msg.me.welcome'}
              values={{email}}
            />
          </p>
        }
        <AuthLogout />
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg,
  viewer: state.users.viewer
}))(Page);
