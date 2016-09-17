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
  // TODO: Use ControlledRouter once it will be released.
  <BrowserHistory
    key={pathname} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
  >
    {({ history, action, location }) => {
      if (location.pathname !== pathname) {
        setImmediate(() => {
          dispatch(setLocation(location));
        });
      }
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

// We needs such Root for vanilla hot reloading.
const Root = ({ store }: RootProps) => (
  <Redux store={store}>
    <ConnectedRouter />
  </Redux>
);

export default Root;
