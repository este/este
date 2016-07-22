import Component from 'react-pure-render/component';
import React from 'react';
import SignIn from './SignIn.react';
import { CenteredContainer } from '../app/components';

export default class SignInPage extends Component {

  render() {
    return (
      <CenteredContainer>
        <SignIn />
      </CenteredContainer>
    );
  }

}
