//import './app.styl';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import flux from '../lib/flux';
import store from './store';
import {RouteHandler} from 'react-router';
import {createValidate} from '../validate';
import VamosTheme from '../libs/vamos-theme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cookies from 'cookies-js';
import APIUtils from '../libs/APIUtils';

import mui from 'material-ui';

const ThemeManager = new mui.Styles.ThemeManager();

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


import actions from './allActions';

@flux(store)
export default class App extends Component {

    static propTypes = {
        flux: React.PropTypes.object.isRequired,
        msg: React.PropTypes.object.isRequired,
        users: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillMount() {
        ThemeManager.setPalette(VamosTheme.getPalette());
        this.createActions();

        if (process.env.IS_BROWSER)
            APIUtils.setHeaders(Cookies.get('user') || null);
    }

    createActions() {
        const {flux, msg} = this.props;
        const validate = createValidate(msg);
        this.actions = actions.reduce((actions, {feature, create}) => {
            const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
            const featureActions = create(dispatch, validate, msg[feature]);
            return {...actions, [feature]: featureActions};
        }, {});
    }

    render() {
        const props = {...this.props, actions: this.actions};
        const {users: {viewer}, msg} = props;

        return (
            <RouteHandler {...props} />
        );
    }

}
