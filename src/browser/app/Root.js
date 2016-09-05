/* @flow */
import React from 'react';
import createRoutes from '../createRoutes';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

type Props = {
  history: Object,
  store: Object,
};

// Root component is the must for vanilla hot reloading.
// Using HMR Directly: medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf
const Root = ({ history, store }: Props) => {
  const routes = createRoutes(store.getState);
  return (
    // Don't touch. Otherwise, server-side rendering will not work.
    <Provider store={store}>
      <Router
        history={history}
        render={applyRouterMiddleware(useScroll())}
      >
        {routes}
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired,
};

export default Root;
