/* @flow */
import App from './App';
import MemoryHistory from 'react-history/MemoryHistory';
import React from 'react';
import { Provider as Redux, connect } from 'react-redux';
import { StaticRouter } from 'react-router';
import { setLocation } from '../../common/app/actions';

type RouterProps = {
  appLocation: ?Object,
  dispatch: () => void,
  pathname: ?string,
};

const getMemoryHistoryInitialState = appLocation => ({
  ...(appLocation && {
    initialEntries: [appLocation],
    initialIndex: 0,
  }),
});

// TODO: Use ControlledRouter once it will be released.
const Router = ({ appLocation, dispatch, pathname }: RouterProps) => (
  <MemoryHistory {...getMemoryHistoryInitialState(appLocation)}>
    {({ history, action, location }) => {
      if (location.pathname !== pathname) {
        setImmediate(() => {
          dispatch(setLocation(location));
        });
      }
      return (
        <StaticRouter
          action={action}
          canGo={history.canGo}
          key={pathname} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
          location={location}
          onPush={history.push}
          onReplace={history.replace}
        >
          <App />
        </StaticRouter>
      );
    }}
  </MemoryHistory>
);

const ConnectedRouter = connect(state => ({
  appLocation: state.app.location,
  pathname: state.app.location && state.app.location.pathname,
}))(Router);

type Props = {
  store: Object,
};

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  props: Props;

  render() {
    const { store } = this.props;
    return (
      <Redux store={store}>
        <ConnectedRouter />
      </Redux>
    );
  }

}

export default Root;
