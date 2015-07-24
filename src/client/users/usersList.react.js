import Component from '../components/component.react';
import React from 'react';
//import UserItem from './userItem.react';
import {List} from 'material-ui';

class UsersList extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        list: React.PropTypes.object.isRequired
    };

    render() {
        const users = this.props.list;


        return (
             <List>
                {users.map(user => {
                    return (
                        <li>coucou</li>
                    );
                })}
            </List>
        );
    }

}

export default UsersList;
