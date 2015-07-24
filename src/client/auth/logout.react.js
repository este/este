import Component from '../components/component.react';
import React from 'react';

export default class Logout extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired
    }

    render() {
        const {
            actions: {auth: actions},
            msg: {auth: msg}
        } = this.props;

        return (
            <div className="logout">
                <button
                    children={msg.logout.button}
                    onClick={actions.logout}
                />
            </div>
        );
    }

}
