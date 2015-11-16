import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default class Logout extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  }

  logout() {
    const {actions} = this.props;
    actions.logout();
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
