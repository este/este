import Component from '../../components/component.react';
import RolePolicy from '../../components/rolePolicy.react';
import React from 'react';
//let Router = require('react-router');
import { MenuItem, LeftNav, Avatar } from 'material-ui';

let menuItems = [
    { route: 'home', text: 'Home' },
    { route: 'users', text: 'Utilisateurs', access: 'UserPage' },
    { type: MenuItem.Types.SUBHEADER, text: 'A subtitle' },
    { type: MenuItem.Types.LINK, payload: 'https://github.com/callemall/material-ui', text: 'A link', access: 'LinkAccess' },
    { type: MenuItem.Types.LINK, payload: 'http://facebook.github.io/react', text: 'A link' },
    { type: MenuItem.Types.LINK, payload: 'https://www.google.com/design/spec/material-design/introduction.html', text: 'A link' }
];

menuItems = checkAccess(menuItems);

function checkAccess(items) {
    let availableItems = [];

    for (const item in items) {
        const access = items[item].access;

        if (!access || RolePolicy.canAccess(access))
            availableItems.push(items[item]);
    }

    return availableItems;
}

class AppLeftNav extends Component {

    constructor() {
        super();
        this.toggle = ::this.toggle;
        this._getSelectedIndex = ::this._getSelectedIndex;
        this._onLeftNavChange = ::this._onLeftNavChange;
    }

    render() {

        const header = (
            <header className="nav__header">
                <Avatar
                    src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg"
                    style={{
                        width: '53px',
                        height: '53px',
                        marginLeft: '10px',
                        marginBottom: '5px'
                    }}/>
                <div className="nav__header__info">
                    Hello Stéphane
                </div>
            </header>
        );


        return (
            <LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                menuItems={menuItems}
                selectedIndex={this._getSelectedIndex()}
                onChange={this._onLeftNavChange}
                header={header} />
        );
    }

    /**
    * @desc Toggles between the open and closed states.
    */
    toggle() {
        this.refs.leftNav.toggle();
    }

    /**
    * @desc Indicates the particular item in the menuItems array that is currently selected.
    */
    _getSelectedIndex() {
        let currentItem;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            currentItem = menuItems[i];
            if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
        }
    }

    /*
    * @desc Fired when a menu item is clicked that is not the one currently selected.
    */
    _onLeftNavChange(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }
}

export default AppLeftNav;
