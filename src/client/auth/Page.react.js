import AuthLogin from './Login.react';
import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <DocumentTitle title={msg.auth.login.title}>
        <div className="login-page">
          <AuthLogin {...this.props} />
        </div>
      </DocumentTitle>
    );
  }

}
