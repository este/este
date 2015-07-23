import Component from '../components/component.react';
import React from 'react';
//import UserList from './userList.react';

export default class Users extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired
  };

  render() {
    const {actions, msg} = this.props;

    return (
      <div> Coucou </div>
    );
  }

}
