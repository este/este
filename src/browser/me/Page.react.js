import AuthLogout from '../auth/Logout.react';
import Component from 'react-pure-render/component';
import fetch from '../components/fetch';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import RouterHandler from '../../common/components/RouterHandler.react';
import {fetchMe} from '../../common/users/actions';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router';

if (process.env.IS_BROWSER)
  require('./Page.styl');

@fetch(fetchMe)
export default class Page extends Component {

  static propTypes = {
    children: PropTypes.object,
    msg: PropTypes.object,
    users: PropTypes.object
  }

  render() {
    const {children, msg, users: {viewer: {createdAt, email}}} = this.props;

    return (
      <div className="me-page">
        <Helmet title={msg.me.title} />
        <ul>
          <li><Link activeClassName="active" to="/me/profile">{msg.profile.title}</Link></li>
          <li><Link activeClassName="active" to="/me/settings">{msg.settings.title}</Link></li>
        </ul>
        {children
          ? <RouterHandler {...this.props} />
          : <p>
              <FormattedMessage
                defaultMessage={msg.me.welcome}
                id={'msg.me.welcome'}
                values={{email, createdAt}}
              />
            </p>
        }
        <AuthLogout msg={msg.auth.logout} />
      </div>
    );
  }

}
