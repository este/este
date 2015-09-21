import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import Login from '../auth/login.react';
import React, {PropTypes} from 'react';

export default class Auth extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <DocumentTitle title={msg.auth.index.title}>
        <div className="login-page">
          <Login {...this.props} />
        </div>
      </DocumentTitle>
    );
  }

}
