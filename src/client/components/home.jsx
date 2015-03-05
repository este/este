import React from 'react'
import {Link} from 'react-router'

export default React.createClass({

  render() {
    return (
      <div>
        <p>
          An empty app bootstrap for <a href="https://github.com/steida/este">
          Este.js</a> dev stack. Check <Link to="todos">todos</Link>.
        </p>
      </div>
    )
  }

})
