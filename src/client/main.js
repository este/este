import React from 'react';
import Router from 'react-router';
import routes from './routes';

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app');

function fetchData(routes, params) {
  let num = 0;
  const total = routes.length;

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData()
        .then(()=> {
          NProgress.set(++num/total);
        })
    })
  );
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  NProgress.start();
  fetchData(state.routes, state.params).then((data) => {
    NProgress.done();
    React.render(<Handler />, app);
  });
});

// // TODO: Report app errors.
// if ('production' === process.env.NODE_ENV) {
// }
