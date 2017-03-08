// @flow
import BaseRoot from '../../browser/app/BaseRoot';
import Helmet from 'react-helmet';
import Html from './Html';
import React from 'react';
import Root, { createRouterRender } from '../../browser/app/Root';
import config from '../config';
import configureFela from '../../browser/configureFela';
import configureFound from '../../browser/configureFound';
import configureStore from '../../common/configureStore';
import createInitialState from './createInitialState';
import serialize from 'serialize-javascript';
import { RedirectException } from 'found';
import { RouterProvider } from 'found/lib/server';
import { ServerProtocol } from 'farce';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

// createInitialState loads files, so it must be called once.
const initialState = createInitialState();

const localeList = config.locales.join(', ');

const getHost = req =>
  `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

const getTheme = req =>
  process.env.IS_SERVERLESS
    ? config.defaultTheme // No SSR, use default theme
    : (req.cookies && req.cookies.theme) // User set language explicitly in app
      || config.defaultTheme; // No preference, use default theme

const getLocale = req =>
  process.env.IS_SERVERLESS
    ? config.defaultLocale // No SSR, use default locale
    : (req.cookies && req.cookies.locale) // User set language explicitly in app
      || req.acceptsLanguages(config.locales) // Browser specified language
      || config.defaultLocale; // No preference, use default locale

const createStore = (found, req): Object => configureStore({
  initialState: {
    ...initialState,
    app: {
      currentTheme: getTheme(req),
    },
    device: {
      ...initialState.device,
      host: getHost(req),
    },
    intl: {
      ...initialState.intl,
      currentLocale: getLocale(req),
      initialNow: Date.now(),
    },
  },
  platformReducers: { found: found.reducer },
  platformStoreEnhancers: found.storeEnhancers,
});

const renderBody = (renderArgs, store, userAgent) => {
  const felaRenderer = configureFela(userAgent);
  const html = renderToString(
    <BaseRoot felaRenderer={felaRenderer} store={store}>
      <RouterProvider router={renderArgs.router}>
        {createRouterRender(renderArgs)}
      </RouterProvider>
    </BaseRoot>,
  );
  const helmet = Helmet.rewind();
  const css = felaRenderer.renderToString();
  return { html, helmet, css };
};

const renderScripts = (state, appJsFilename) =>
  // github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  `
    <script>
      window.__INITIAL_STATE__ = ${serialize(state)};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderHtml = (state, body) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets();
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh();
  }
  const scripts = renderScripts(state, appJsFilename);
  const html = renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyCss={body.css}
      bodyHtml={`<div id="app">${body.html}</div>${scripts}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={body.helmet}
      isProduction={config.isProduction}
    />,
  );
  return `<!DOCTYPE html>${html}`;
};

const render = async (req: Object, res: Object, next: Function) => {
  const found = configureFound(Root.routeConfig, new ServerProtocol(req.url));
  const store = createStore(found, req);
  const userAgent = req.headers['user-agent'];
  try {
    await found.getRenderArgs(store, renderArgs => {
      const body = renderBody(renderArgs, store, userAgent);
      const html = renderHtml(store.getState(), body);
      res.header('Content-Language', localeList);
      res.status(renderArgs.error ? renderArgs.error.status : 200).send(html);
    });
  } catch (error) {
    if (error instanceof RedirectException) {
      res.redirect(302, store.farce.createHref(error.location));
      return;
    }
    next(error);
  }
};

export default render;
