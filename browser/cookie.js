// @flow
/* eslint-env browser */
import { serialize, parse } from 'cookie';
import type { AppReq } from '../server/web';

// Do not add another values to cookie until it's absolutely necessary.
// Use user settings instead.
export type Cookie = {|
  +token: string,
|};

const name = 'este';

export const setCookie = (cookie: Cookie) => {
  const options = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  };
  window.document.cookie = serialize(name, cookie.token, options);
};

export const deleteCookie = () => {
  const options = {
    maxAge: -1, // Expire the cookie immediately.
    path: '/',
  };
  window.document.cookie = serialize(name, '', options);
};

export const getCookie = (serverReq: ?AppReq): ?Cookie => {
  const cookie = parse(
    serverReq
      ? (serverReq.headers && serverReq.headers.cookie) || ''
      : window.document.cookie,
  );
  if (!cookie || !cookie[name]) return null;
  return { token: cookie[name] };
};
