import * as authActions from '../../common/auth/actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired,
    msg: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const {logout} = this.props;
    // Redirect user to root page before logout since logout recycles app state.
    this.context.router.replace('/');
    logout();
  }

  render() {
    const {msg} = this.props;

    return (
      <div className="logout">
        <button onClick={this.logout}>{msg.button}</button>
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.auth.logout
}), authActions)(Logout);
