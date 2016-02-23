import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import Login from './Login.react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Page extends Component {

  static propTypes = {
    location: PropTypes.object,
    msg: PropTypes.object
  };

  render() {
    const { location, msg } = this.props;

    return (
      <div className="login-page">
        <Helmet title={msg.title} />
        <Login location={location} />
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.auth.login
}))(Page);
