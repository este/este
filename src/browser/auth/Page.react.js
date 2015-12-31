import AuthLogin from './Login.react';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="login-page">
        <Helmet title={msg.auth.login.title} />
        <AuthLogin {...this.props} />
      </div>
    );
  }

}
