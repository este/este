import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Settings extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="settings-page">
        <Helmet title={msg.title} />
        <p>
          {msg.title}
        </p>
      </div>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.settings
}))(Settings);
