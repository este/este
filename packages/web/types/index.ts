export type AppHref =
  | '/'
  | 'https://twitter.com/steida'
  | '/me'
  | {
      pathname: '/signin';
      query?: { redirectUrl: string };
    }
  | {
      pathname: '/web';
      query: { id: string };
    };
