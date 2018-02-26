// @flow
/* eslint-disable no-undef */
import { serialize, parse } from 'cookie';

export type Cookie = {|
  +token: string,
|};

// TODO: The key should be package.json name prop for better DX. Probaly via
// process.env.APP_NAME or something else. PR anyone?
const key = 'este';

export const setCookie = (cookie: Cookie) => {
  const options = {
    // One month.
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  };

  const value = JSON.stringify(cookie);
  document.cookie = serialize(key, value, options);
};

export const deleteCookie = () => {
  const options = {
    // Expire the cookie immediately.
    maxAge: -1,
    path: '/',
  };

  document.cookie = serialize(key, '', options);
};

export const getCookie = (serverReq: ?Object): ?Cookie => {
  const value = parse(
    serverReq
      ? (serverReq.headers && serverReq.headers.cookie) || ''
      : document.cookie,
  );
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};
