import Promise from 'bluebird';
import Immutable from 'immutable';
import Router from 'react-router';
import Flux from '../../client/lib/flux/flux';
import store from '../../client/app/store';
import initialState from '../initialstate';
import stateMerger from '../lib/merger';
import routes from '../../client/routes';

import allActions from '../../client/app/allActions';

export default function initialStateAndFetchData() {

  return (req, res, next) => {

    let appState = Immutable.fromJS(initialState).mergeWith(stateMerger, req.userState, {intl: req.intl}).toJS();
    const flux = new Flux(store, appState);

    const actions = allActions.reduce((actions, {feature, create}) => {
      const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
      const featureActions = create(dispatch);
      return {...actions, [feature]: featureActions};
    }, {});

    Router.run(routes, req.originalUrl, (Root, routerState) => {

      Promise.all(routerState.routes
        .filter(route => route.handler.fetchData)
        .map(route => {
          return route.handler.fetchData(actions); //Pass actions here - Maybe there is a better solution. Honestly I've no idea what I'm doing :)
        })
      ).then(() => {

        req.appState = flux.state.toJS(); //Get updated state
        next();

      });

    });


  };

}
