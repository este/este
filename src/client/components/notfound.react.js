import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  }

  render() {
    const {msg: {components: msg}} = this.props;

    return (
      <DocumentTitle title={msg.notFound.title}>
        <div className="notfound-page">
          <h1>{msg.notFound.header}</h1>
          <p>{msg.notFound.message}</p>
          <Link to="home">{msg.notFound.continueMessage}</Link>
        </div>
      </DocumentTitle>
    );
  }

}
