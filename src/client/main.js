import React from 'react'
import Router from 'react-router'
import routes from './routes'
import {i18nCursor} from './state'

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app')

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler {...i18nCursor().toJS()} />, app)
})

// // TODO: Report app errors.
// if ('production' === process.env.NODE_ENV) {
// }
