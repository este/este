/* @flow */
import App from './App';
import React from 'react';
import { BrowserRouter, Match } from 'react-router';
import { Provider as Redux, connect } from 'react-redux';
import { appSetLocation } from '../../common/app/actions';

type RouterProps = {
  dispatch: () => void,
  pathname: ?string,
};

const Router = ({ dispatch, pathname }: RouterProps) => (
  <BrowserRouter>
    {/* TODO: Use react-router-redux when it will be ready for RR4 */}
    <Match
      pattern="*"
      render={({ location }) => {
        if (location.pathname !== pathname) {
          setImmediate(() => {
            dispatch(appSetLocation(location));
          });
        }
        return <App />;
      }}
    />
  </BrowserRouter>
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
