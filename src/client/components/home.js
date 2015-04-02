import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {

  static fetchData() {
    // fake a long response from api server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, Math.random() > 0.5 ? 500 : 1000);
    });
  }

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
