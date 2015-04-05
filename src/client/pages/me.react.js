import Logout from '../auth/logout.react';
import React from 'react';
import requireAuth from '../auth/requireauth.react';

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

export default requireAuth(Me);
