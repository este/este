/** @jsx React.DOM */
goog.provide('server.react.App');

/**
 * @constructor
 */
server.react.App = function() {
  this.create = React.createClass({

    render: function() {
      return (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <title>{this.props.title}</title>
            <link href="/app/client/img/favicon.ico" rel="shortcut icon" />
            <link href={'/app/client/build/app.css?v=' + this.props.buildNumber} rel="stylesheet" />
            <script src={'/app/client/build/app.js?v=' + this.props.buildNumber}></script>
            {
              this.props.isDev && [
                '/bower_components/closure-library/closure/goog/base.js',
                '/tmp/deps.js',
                '/app/client/js/main.js'
              ].map(function(src, i) {
                return <script src={src} key={i}></script>
              })
            }
          </head>
          <body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}}>
          </body>
        </html>
      );
    }

  });

};