import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import {msg} from '../intl/store';
import PureComponent from '../components/purecomponent.react.js';

export default class NotFound extends PureComponent {

  render() {
    return (
      <DocumentTitle title={msg('notFound.title')}>
        <div>
          <h1>{msg('notFound.header')}</h1>
          <p>{msg('notFound.message')}</p>
          <Link to="home">{msg('notFound.continueMessage')}</Link>
        </div>
      </DocumentTitle>
    );
  }

}
