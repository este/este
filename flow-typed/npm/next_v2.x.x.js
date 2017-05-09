// flow-typed signature: 4d3fb8f2ed0c9a8ce4bc20ddec1dd85a
// flow-typed version: d80d7aa0bf/next_v2.x.x/flow_>=v0.37.x

declare module "next" {
  declare type RequestHandler = (req: http$IncomingMessage, res: http$ServerResponse, parsedUrl: any) => Promise<void>;
  declare type NextApp = {
    prepare(): Promise<void>,
    getRequestHandler(): RequestHandler,
    render(req: http$IncomingMessage, res: http$ServerResponse, pathname: string, query: any): any,
    renderToHTML(req: http$IncomingMessage, res: http$ServerResponse, pathname: string, query: string): string,
    renderError(err: Error, req: http$IncomingMessage, res: http$ServerResponse, pathname: any, query: any): any,
    renderErrorToHTML(err: Error, req: http$IncomingMessage, res: http$ServerResponse, pathname: string, query: any): string,
  };
  declare type Options = {
    dev?: boolean,
    dir?: string,
    quiet?: boolean,
    staticMarkup?: boolean,
  };
  declare module.exports: (opts: Options) => NextApp;
}

declare module "next/head" {
  import type {Component} from 'react';

  declare export default Class<Component<void, *, *>>;
}

declare module "next/link" {
  import type {Component} from 'react';

  declare type State = { href: string };
  declare export default Class<Component<void, State, *>>;
}

declare module "next/prefetch" {
  import type {Component} from 'react';

  declare type State = {
    href: string,
    prefetch?: boolean,
  };
  declare export var reloadIfPrefetched: any;
  declare export function prefetch(url: string): any;
  declare export default Class<Component<void, State, *>>;
}

declare module "next/router" {
  declare type RouteError = Error & { cancelled: boolean };
  declare type RouteCallback = (url: string) => void;
  declare type RouteErrorCallback = (err: RouteError, url: string) => void;

  declare export default {
    route: string;
    pathname: string;
    query: Object;
    onRouteChangeStart: ?RouteCallback;
    onRouteChangeComplete: ?RouteCallback;
    onRouteChangeError: ?RouteErrorCallback;
    push(url: string, as: ?string): Promise<boolean>;
    replace(url: string, as: ?string): Promise<boolean>;
  };
}

declare module "next/document" {
  import type {Component} from 'react';

  declare type Context = {
    pathname: string,
    query: any,
    req?: any,
    res?: any,
    xhr?: any,
    err?: any,
  };
  declare export var Head: Class<Component<void, *, *>>;
  declare export var Main: Class<Component<void, *, *>>;
  declare export var NextScript: Class<Component<void, *, *>>;
  declare export default Class<Component<void, *, *>> & {
    getInitialProps: (ctx: Context) => Promise<*>;
    renderPage(cb: Function): void;
  };
}
