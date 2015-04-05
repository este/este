import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {

  render() {
    return (
      <div>
        <p>
          App starter kit for <a href="https://github.com/steida/este">
          Este.js</a>. Check <Link to="todos">todos</Link>.
        </p>
      </div>
    );
  }

}
