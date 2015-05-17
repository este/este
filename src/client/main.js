import React from 'react';
import Router from 'react-router';
import routes from './routes';

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  console.time('app render on route change'); // eslint-disable-line no-console
  React.render(<Handler />, app, () => {
    console.timeEnd('app render on route change'); // eslint-disable-line no-console
  });
});

// if ('production' === process.env.NODE_ENV) {
//   // TODO: Report app errors.
// }
