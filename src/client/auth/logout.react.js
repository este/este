import React from 'react';
import {logout} from './actions';
import {msg} from '../intl/store';
import PureComponent from '../components/purecomponent.react';

export default class Logout extends PureComponent {

  render() {
    return (
      <div className="logout">
        <button
          children={msg('auth.logout.button')}
          onClick={logout}
        />
      </div>
    );
  }

}
