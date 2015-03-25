import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends React.Component {

  render() {
    return (
      <DocumentTitle title={'Page Not Found'}>
        <div>
          <h1>
            {`This page isn't available`}
          </h1>
          <p>
            {'The link may be broken, or the page may have been removed.'}
          </p>
          <Link to="home">{'Continue here please.'}</Link>
        </div>
      </DocumentTitle>
    );
  }

}
