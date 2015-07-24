import Component from '../components/component.react';
import React from 'react';
import UserItem from './userItem.react';
import {List} from 'material-ui';

class UsersList extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        list: React.PropTypes.object.isRequired
    };

    render() {
        const {actions, msg, list} = this.props;


        return (
             <List>
                {list.map(user => {
                    return (
                        <UserItem
                            user={user}
                            key={user.id}
                            {...{actions, msg}}
                        />
                    );
                })}
            </List>
        );
    }

}

export default UsersList;
