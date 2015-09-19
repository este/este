import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import ToCheck from './toCheck.react';
import {FormattedHTMLMessage} from 'react-intl';

export default class HomeIndex extends Component {

  // Why not .isRequired? https://github.com/rackt/react-router/issues/1505
  static propTypes = {
    msg: PropTypes.object
  }

  render() {
    const {msg} = this.props;

    return (
      <DocumentTitle title={msg.home.title}>
        <div className="home-page">
          <p>
            <FormattedHTMLMessage defaultMessage={msg.home.infoHtml} />
          </p>
          <ToCheck msg={msg.home.toCheck} />
        </div>
      </DocumentTitle>
    );
  }

}
