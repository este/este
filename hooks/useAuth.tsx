import cookie from 'cookie';
import { IncomingMessage } from 'http';
import Router from 'next/router';
import React from 'react';
import { AppHref } from '../pages/_app';

const cookieName = 'token';
const localStorageKey = 'signOut';

const browserRedirectToIndexAfterSignOut = () => {
  const href: AppHref = '/';
  // Browser redirect to purge sensitive session data.
  window.location.href = href;
};

const useAuth = () => {
  const signIn = (token: string) => {
    window.document.cookie = cookie.serialize(cookieName, token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    const redirectUrl = Router.query && Router.query.redirectUrl;
    if (typeof redirectUrl === 'string') {
      Router.replace(redirectUrl);
    } else {
      // We don't need full redirect.
      const href: AppHref = '/';
      Router.replace(href);
    }
  };

  const signOut = () => {
    window.document.cookie = cookie.serialize(cookieName, '', {
      maxAge: -1, // Expire the cookie immediately.
      path: '/',
    });
    // To sign out from all windows.
    window.localStorage.setItem(localStorageKey, Date.now().toString());
    browserRedirectToIndexAfterSignOut();
  };

  return { signIn, signOut };
};

export default useAuth;

const useAuthSync = () => {
  const syncLogout = (event: StorageEvent) => {
    if (event.key === localStorageKey) {
      browserRedirectToIndexAfterSignOut();
    }
  };
  React.useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
      window.localStorage.removeItem(localStorageKey);
    };
  }, []);
};

// We need provider because _app is a class and classes doesn't support Hooks.
export const AuthSyncProvider: React.FunctionComponent = props => {
  useAuthSync();
  return <React.Fragment>{props.children}</React.Fragment>;
};

// If there are no cookies or cookies can't be applied, return the empty string.
export const maybeGetAuthToken = (req: IncomingMessage | undefined): string => {
  const value = req ? req.headers.cookie || '' : window.document.cookie;
  return cookie.parse(value)[cookieName] || '';
};
