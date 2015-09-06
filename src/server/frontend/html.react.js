import Component from '../../client/components/component.react';
import React from 'react';

export default class Html extends Component {

  static propTypes = {
    appCssHash: React.PropTypes.string.isRequired,
    bodyHtml: React.PropTypes.string.isRequired,
    googleAnalyticsId: React.PropTypes.string.isRequired,
    isProduction: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired
  }

  render() {
    const {
      appCssHash, bodyHtml, googleAnalyticsId, isProduction, title
    } = this.props;

    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = isProduction &&
      <link
        href={'/_assets/app.css?' + appCssHash}
        rel="stylesheet"
      />;

    const analytics = isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
      <script
        dangerouslySetInnerHTML={{__html: `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${googleAnalyticsId}', 'auto'); ga('send', 'pageview');`}}
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{title}</title>
          {linkStyles}
          {analytics}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHtml}} />
      </html>
    );
  }

}
