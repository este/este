import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';

export default class Index extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {msg: {home: msg}} = this.props;

    return (
      <DocumentTitle title={msg.title}>
        <div className="home-page">
          <p>
            <FormattedHTMLMessage message={msg.infoHtml} />{' '}
            <Link to="todos">{msg.todos}</Link>.
          </p>
        </div>
      </DocumentTitle>
    );
  }

}
