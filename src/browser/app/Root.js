/* @flow */
import App from './App';
import BrowserHistory from 'react-history/BrowserHistory';
import React from 'react';
import { Provider as Redux, connect } from 'react-redux';
import { StaticRouter } from 'react-router';
import { setLocation } from '../../common/app/actions';

type RouterProps = {
  dispatch: () => void,
  pathname: string,
};

const Router = ({ dispatch, pathname }: RouterProps) => (
  <BrowserHistory key={pathname}>
    {({ history, action, location }) => {
      setTimeout(() => {
        dispatch(setLocation(location));
      }, 0);
      return (
        <StaticRouter
          action={action}
          location={location}
          onPush={history.push}
          onReplace={history.replace}
          blockTransitions={history.block}
        >
          <App />
        </StaticRouter>
      );
    }}
  </BrowserHistory>
);

const ConnectedRouter = connect(state => ({
  pathname: state.app.location && state.app.location.pathname,
}))(Router);

type RootProps = {
  store: Object,
};

const Root = ({ store }: RootProps) => (
  <Redux store={store}>
    <ConnectedRouter />
  </Redux>
);

export default Root;
