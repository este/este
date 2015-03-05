import React from 'react'
import Router from 'react-router'
import routes from './routes'
import {state, i18nCursor} from './state'

(() => {
  state.load(window._appState)
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler {...i18nCursor().toJS()} />, document.body)
  })
  if ('production' != process.env.NODE_ENV) {
    // Dev only code.
    // TODO: Report app errors.
  }
})()
