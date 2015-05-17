import * as actions from './actions';
import PureComponent from '../components/purecomponent.react';
import React from 'react';
import {msg} from '../intl/store';

export default class Logout extends PureComponent {

  render() {
    return (
      <div className="logout">
        <button
          children={msg('auth.logout.button')}
          onClick={actions.logout}
        />
      </div>
    );
  }

}
