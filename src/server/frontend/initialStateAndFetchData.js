import Promise from 'bluebird';
import Immutable from 'immutable';
import Router from 'react-router';
import Flux from '../../client/lib/flux/flux';
import store from '../../client/app/store';
import initialState from '../initialstate';
import stateMerger from '../lib/merger';
import routes from '../../client/routes';
import allActions from '../../client/app/allActions';
import APIUtils from '../../client/libs/APIUtils';

export default function initialStateAndFetchData() {

    return (req, res, next) => {

        //Set cookie for APIUtils
        APIUtils.setHeaders(req.cookies.user || null);

        let appState = Immutable.fromJS(initialState).mergeWith(stateMerger, req.userState, {intl: req.intl}).toJS();
        const flux = new Flux(store, appState);

        const actions = allActions.reduce((actions, {feature, create}) => {
            const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
            const featureActions = create(dispatch);
            return {...actions, [feature]: featureActions};
        }, {});

        const router = Router.create({
            routes,
            location: req.originalUrl,
            onAbort: (abortReason) => {
                // Some requireAuth higher order component requested redirect.
                if (abortReason.constructor.name === 'Redirect') {
                    const {to, params, query} = abortReason;
                    const path = router.makePath(to, params, query);
                    res.redirect(path);
                    return;
                }
            }
        });

        router.run((Root, routerState) => {

            Promise.all(routerState.routes
                .filter(route => route.handler.fetchData)
                .map(route => {
                    return route.handler.fetchData(actions); //Pass actions here - Maybe there is a better solution. Honestly I've no idea what I'm doing :)
                })
            ).then(() => {

                req.appState = flux.state.toJS(); //Get updated state
                next();

            }).catch(next);

        });


    };

}
