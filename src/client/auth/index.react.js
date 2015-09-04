import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import Login from './login.react';
import React from 'react';

export default class AuthIndex extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
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
