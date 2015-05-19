import * as actions from './actions';
import Component from '../components/component.react';
import React from 'react';
import {msg} from '../intl/store';

export default class Logout extends Component {

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
