import Component from '../components/component.react';
import React from 'react';
import {IconButton, ListItem, ListDivider, Avatar} from 'material-ui';

class UserItem extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        user: React.PropTypes.object.isRequired
    };

    render() {
        const {user, msg} = this.props;
        const picture = user.picture ? user.picture : 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg';
        const editButton = (
                                <IconButton tooltipPosition="top-center" tooltip={msg.edit}>
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

