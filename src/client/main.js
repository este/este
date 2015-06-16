import React from 'react';
import Router from 'react-router';
import routes from './routes';

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  // if ('production' !== process.env.NODE_ENV)
  //   console.time('app render on route change'); // eslint-disable-line no-console
  React.render(<Handler />, app, () => {
    // if ('production' !== process.env.NODE_ENV)
    //   console.timeEnd('app render on route change'); // eslint-disable-line no-console
  });
});
