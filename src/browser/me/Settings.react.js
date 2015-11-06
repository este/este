import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';

export default class Settings extends Component {

  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <DocumentTitle title={msg.settings.title}>
        <div className="settings-page">
          <p>
            {msg.settings.title}
          </p>
        </div>
      </DocumentTitle>
    );
  }

}
