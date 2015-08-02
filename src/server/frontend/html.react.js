import Component from '../../client/components/component.react';
import React from 'react';

export default class Html extends Component {

  static propTypes = {
    bodyHtml: React.PropTypes.string.isRequired,
    isProduction: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired
  }

  render() {
    const {bodyHtml, isProduction, title, version} = this.props;

    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = isProduction &&
      <link
        href={`/build/app.css?v=${version}`}
        rel="stylesheet"
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{title}</title>
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHtml}} />
      </html>
    );
  }

}
