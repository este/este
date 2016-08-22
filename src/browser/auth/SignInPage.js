import Helmet from 'react-helmet';
import React from 'react';
import SignIn from './SignIn';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { locationShape } from 'react-router';

class SignInPage extends React.Component {

  static propTypes = {
    location: locationShape,
  };

  render() {
    const { location } = this.props;

    return (
      <div className="signin-page">
        <FormattedMessage {...linksMessages.signIn}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <p>
          Este uses <a
            href="https://firebase.google.com/docs/auth/"
            rel="noopener noreferrer"
            target="_blank"
          >Firebase Authentication</a> because it saves a lot of time.
        </p>
        <SignIn location={location} />
      </div>
    );
  }

}

export default SignInPage;
