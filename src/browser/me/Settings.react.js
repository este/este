import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';

export default class Settings extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  render() {
    const {msg} = this.props;

    return (
      <div className="settings-page">
        <Helmet title={msg.settings.title} />
        <p>
          {msg.settings.title}
        </p>
      </div>
    );
  }

}
