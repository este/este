import { useMemo } from 'react';
import * as t from 'io-ts';
import useAppContext from './useAppContext';

// Typed app routing via brilliant gcanti/io-ts.
// Soon in Next.js: https://twitter.com/timneutkens/status/1109092151907045376

const AppHrefIO = t.union([
  t.type({ pathname: t.literal('/') }),
  t.type({ pathname: t.literal('/me') }),
  t.type({ pathname: t.literal('https://twitter.com/steida') }),
  t.type({
    pathname: t.literal('/web'),
    query: t.type({ id: t.string }),
  }),
  // https://github.com/gcanti/io-ts#mixing-required-and-optional-props
  t.intersection([
    t.type({ pathname: t.literal('/signin') }),
    t.partial({ query: t.type({ redirectUrl: t.string }) }),
  ]),
]);

export type AppHref = t.TypeOf<typeof AppHrefIO>;

const useAppHref = () => {
  const { router } = useAppContext();

  // This should be memoized globally. In serverless, it means per request :-)
  const current = useMemo<AppHref | undefined>(() => {
    let maybeAppHref: AppHref | undefined;
    const routerAppHref = { pathname: router.pathname, query: router.query };
    AppHrefIO.decode(routerAppHref).fold(
      _errors => {}, // No need to report unmatched app href.
      value => {
        maybeAppHref = value;
      },
    );
    return maybeAppHref;
  }, [router.pathname, router.query]);

  // Filter AppHref by pathname, then infer query.
  type Query<T> = T extends { query?: infer Q } ? Q : undefined;
  type QueryReturn<P> = Query<Extract<AppHref, { pathname: P }>> | undefined;

  return useMemo(
    () => ({
      current,
      push(href: AppHref) {
        router.push(href);
      },
      replace(href: AppHref) {
        router.replace(href);
      },
      isActive(href: AppHref) {
        const hrefQuery = 'query' in href && href.query;
        return (
          href.pathname === router.pathname &&
          JSON.stringify(hrefQuery || {}) === JSON.stringify(router.query || {})
        );
      },
      query<P extends AppHref['pathname']>(pathname: P): QueryReturn<P> {
        if (current == null || current.pathname !== pathname) return;
        // @ts-ignore TODO: Type current.query somehow.
        return current.query || undefined;
      },
    }),
    [current, router],
  );
};

export default useAppHref;
