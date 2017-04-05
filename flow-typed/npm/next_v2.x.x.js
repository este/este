// flow-typed signature: 708ce6ed5f5bc3ae91eb4462b90f5c41
// flow-typed version: bc0d03aa53/next_v2.x.x/flow_>=v0.28.x

/* @flow */

import type { Component } from 'react';

declare module "next" {
  declare type RequestHandler = (req: any, res: any, parsedUrl: any) => Promise<void>;
  declare type NextApp = {
    prepare(): Promise<void>,
    getRequestHandler(): RequestHandler,
    render(req: any, res: any, pathname: string, query: any): any,
    renderToHTML(req: any, res: any, pathname: string, query: string): string,
    renderError(err: Error, req: any, res: any, pathname: any, query: any): any,
    renderErrorToHTML(err: Error, req: any, res: any, pathname: string, query: any): string,
  };
  declare type Options = {
    dev?: boolean,
    dir?: string,
    quiet?: boolean,
    staticMarkup?: boolean,
  };
  declare export default (opts: Options) => NextApp;
}

declare module "next/head" {
  declare export default Class<Component<void, *, *>>;
}

declare module "next/link" {
  declare type State = { href: string };
  declare export default Class<Component<void, State, *>>;
}

declare module "next/prefetch" {
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
