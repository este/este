/* @flow */
import App from './App';
import React from 'react';
import { MemoryRouter, Match } from 'react-router';
import { Provider as Redux, connect } from 'react-redux';
import { appSetLocation } from '../../common/app/actions';

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

const Router = ({ appLocation, dispatch, pathname }: RouterProps) => (
  <MemoryRouter {...getMemoryHistoryInitialState(appLocation)}>
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
  </MemoryRouter>
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
