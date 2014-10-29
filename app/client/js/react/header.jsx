/** @jsx React.DOM */
goog.provide('app.react.Header');

/**
 * This is example of Facebook React JSX.
 * @constructor
 */
app.react.Header = function() {

  this.component = React.createFactory(React.createClass({

    render: function() {
      return (
        <header>
          <h1>Este.js demo</h1>
          <p>
            Simple <a href="http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/" target="_blank">
              isomorphic
            </a>{' '}
            TodoMVC app written with <a href="https://github.com/steida/este" target="_blank">
              Este.js
            </a>{' '}
            and <a href="https://github.com/steida/este-library" target="_blank">
              este-library
            </a>.
          </p>
          <p>
            View page source, this ajax app is server side rendered. Not only,
            we can share any code between client and server side. This is a{' '}
            <b>Holy Grail</b>.
          </p>
          <p>More sophisticated app is in development: <a href="https://github.com/steida/songary">github.com/steida/songary</a>.</p>
        </header>
      );
    }

  }));

};
