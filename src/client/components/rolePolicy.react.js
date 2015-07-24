import React from 'react';
import Component from '../components/component.react';

export default class RolePolicy extends Component {
    static propTypes = {
        access: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired
    };

    static canAccess(role) {
        // fake roles, à enlever quand on recevra les vrais
        const userAccess = ['ExamplePage', 'CreateContact', 'TodosPage', 'UserPage'];

        return userAccess.indexOf(role) !== -1;
    }

    render() {
        const access = RolePolicy.canAccess(this.props.access);

        if (access)
            return (
                <div> { this.props.children } </div>
            );

        return null;
    }

}
