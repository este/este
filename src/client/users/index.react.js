import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import Users from './users.react';
import UsersList from './usersList.react';

export default class UsersIndex extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        users: React.PropTypes.object.isRequired
    };

    static fetchData(actions) {
        console.log(actions.users);
        return actions.users.loadAllUsers();
    }

    componentDidMount() {
        const {users, actions} = this.props;

        if (!users.list.size > 0)
            UsersIndex.fetchData(actions);
    }

    render() {
        const {
            actions: {users: actions},
            msg: {users: msg},
            users: {list: list}
        } = this.props;

        return (
            <DocumentTitle title={msg.title}>
                <div className="users-page">
                    <UsersList {...{list, actions, msg}} />
                </div>
            </DocumentTitle>
        );
    }

}
