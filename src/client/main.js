import React from 'react';
import Router from 'react-router';
import routes from './routes';

const app = document.getElementById('app');
const initialState = window._initialState;

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler initialState={initialState} />, app);
});
