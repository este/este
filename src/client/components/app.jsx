import DocumentTitle from 'react-document-title'
import React from 'react'
import {Link, RouteHandler} from 'react-router'
import {state} from '../state'

// Leverage webpack require goodness for feature toggle based dead code removal.
require('../../../assets/css/app.styl')

export default class App extends React.Component {

  componentDidMount() {
    // Must be required here because there is no DOM in Node.js. Remember,
    // mocking DOM in Node.js is an anti-pattern, because it can confuse
    // isomorphic libraries. TODO: Wait for iOS fix, then remove.
    require('fastclick').attach(document.body)

    state.on('change', () => {
      /*eslint-disable no-console */
      console.time('whole app rerender')
      this.forceUpdate(() => {
        console.timeEnd('whole app rerender')
      })
      /*eslint-enable */
    })
  }

  render() {
    return (
      <DocumentTitle title='Este.js App'>
        <div className="page">
          <header>
            <h1>
              <a href="https://github.com/steida/este">Este.js</a> App
            </h1>
            <ul>
              <li><Link to="home">Home</Link></li>
              <li><Link to="todos">Todos</Link></li>
            </ul>
          </header>
          <RouteHandler />
          <footer>
            <p>
              made by <a href="https://twitter.com/steida">steida</a>
            </p>
          </footer>
        </div>
      </DocumentTitle>
    )
  }

}
