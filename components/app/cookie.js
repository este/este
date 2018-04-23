// @flow
import { serialize, parse } from 'cookie';

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
  document.cookie = serialize(name, cookie.token, options);
};

export const deleteCookie = () => {
  const options = {
    maxAge: -1, // Expire the cookie immediately.
    path: '/',
  };
  document.cookie = serialize(name, '', options);
};

export const getCookie = (serverReq: ?Object): ?Cookie => {
  const cookie = parse(
    serverReq
      ? (serverReq.headers && serverReq.headers.cookie) || ''
      : document.cookie,
  );
  if (!cookie || !cookie[name]) return null;
  return { token: cookie[name] };
};
