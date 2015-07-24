import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import Users from './users.react';
import UsersList from './usersList.react';
import UsersToolbar from './usersToolbar.react';
import UserForm from './userForm.react';
import Pagination from '../components/pagination.react';

export default class UsersIndex extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        users: React.PropTypes.object.isRequired
    };

    static fetchData(actions) {
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

        const msgPagination = this.props.msg;
        
        return (
            <DocumentTitle title={msg.page_title}>
                <div className="users-page">
                    {/*<UserForm {...{list, actions, msg}} />*/}
                    <UsersToolbar {...{list, actions, msg}} />
                    <UsersList {...{list, actions, msg}} />
                    <Pagination action={actions.loadAllUsers} msg={msgPagination}/>
                </div>
            </DocumentTitle>
        );
    }

}
