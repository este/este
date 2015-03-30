import Logout from './logout';
import React from 'react';
import auth from './common/auth';

class Me extends React.Component {

  render() {
    return (
      <div>
        <p>
          This is your secret page.
        </p>
        <Logout />
      </div>
    );
  }

}

export default auth(Me);
