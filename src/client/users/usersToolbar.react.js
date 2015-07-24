import Component from '../components/component.react';
import React from 'react';
import {Toolbar, ToolbarTitle, ToolbarGroup, RaisedButton} from 'material-ui';

class UsersToolbar extends Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired
    };

    render() {
        const {msg} = this.props;
        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <ToolbarTitle text={msg.title} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <RaisedButton float="right" label={msg.create_user} primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }

}

export default UsersToolbar;

