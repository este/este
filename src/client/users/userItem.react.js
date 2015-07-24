/*import Component from '../../components/component.react';
import React from 'react';
import {msg} from '../../messages/store';
import {IconButton, ListItem, ListDivider, Avatar} from 'material-ui';

class UserItem extends Component {

    static propTypes = {
        handleEdit: React.PropTypes.func.isRequired,
        user: React.PropTypes.object.isRequired
    };

    editUser() {
        const {handleEdit} = this.props;

        handleEdit(this.props.user);
    }

    render() {
        const user = this.props.user;
        const picture = user.picture ? user.picture : 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg';
        const editButton = (
                                <IconButton tooltipPosition="top-center" tooltip={msg('edit')} onClick={::this.editUser}>
                                    <i className="material-icons">edit</i>
                                </IconButton>
                            );

        return (
            <div>
                <ListItem
                    leftAvatar={<Avatar src={picture} />}
                    rightIconButton={editButton}
                    >
                    {user.email}
                </ListItem>
                <ListDivider inset={true} />
            </div>
        );
    }

}

export default UserItem;
*/
