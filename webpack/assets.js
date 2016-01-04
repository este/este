import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

export default {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    styles: {
      extensions: ['css', 'less', 'sass', 'scss', 'styl'],
      filter: (module, regex, options, log) => {
        let filter = regex.test(module.name);
        if (options.development) {
          filter = WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        return filter;
      },
      path: (module, options, log) => {
        let path = module.name;
        if (options.development) {
          path = WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return path;
      },
      parser: (module, options, log) => {
        let parser = module.source;
        if (options.development) {
          parser = WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        return parser;
      }
    }
  }
};
