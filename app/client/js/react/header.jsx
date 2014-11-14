goog.provide('app.react.Header');

/**
 * This is example of Facebook React JSX in Este.
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
            todo list demo. You can share React components, routes, whatever code between client and server.
          </p>
          <p>More sophisticated app in development: <a href="https://github.com/steida/songary">github.com/steida/songary</a>.</p>
        </header>
      );
    }

  }));

};
