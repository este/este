import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Logout extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  }

  logout() {
    // Always reload app on logout for security reasons.
    location.href = '/';
  }

  render() {
    const {msg} = this.props;

    return (
      <div className="logout">
        <button onClick={() => this.logout()}>{msg.button}</button>
      </div>
    );
  }

}
