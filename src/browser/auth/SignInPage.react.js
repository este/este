import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import SignIn from './SignIn.react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { locationShape } from 'react-router';

export default class SignInPage extends Component {

  static propTypes = {
    location: locationShape,
  };

  render() {
    const { location } = this.props;

    return (
      <div className="signin-page">
        <FormattedMessage {...linksMessages.signIn}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          <a href="https://www.firebase.com/" target="_blank">
            <img
              role="presentation"
              src={require('../firebase/logo.png')}
              style={{ height: 27, width: 140 }}
            />
          </a>
        </h2>
        <p>
          Este uses <a href="https://firebase.google.com/docs/auth/">
          Firebase Authentication</a> because it saves a lot of time.
        </p>
        <SignIn location={location} />
      </div>
    );
  }

}
