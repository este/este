import React from 'react'

export default React.createClass({

  render() {
    // Only for production. For dev, it's handled by webpack with livereload.
    let linkStyles = this.props.isProduction &&
      <link
        href={`/build/app.css?v=${this.props.version}`}
        rel="stylesheet"
      />

    // TODO: Add favicon.
    let linkFavicon = false && <link
      href={`/build/img/favicon.icon?v=${this.props.version}`}
      rel="shortcut icon"
    />

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{this.props.title}</title>
          {linkStyles}
          {linkFavicon}
        </head>
        <body dangerouslySetInnerHTML={{__html: this.props.bodyHtml}} />
      </html>
    )
  }

})
