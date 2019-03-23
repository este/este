// import { useMemo } from 'react';
// import * as t from 'io-ts';
// import useAppContext from './useAppContext';

// Typed app routing via brilliant gcanti/io-ts.

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

// // TODO: Helper for pathname with optional query. PR anyone?
// const AppHrefIO = t.union([
//   // https://github.com/gcanti/io-ts#mixing-required-and-optional-props
//   t.intersection([
//     t.type({ pathname: t.literal('/') }),
//     t.partial({
//       query: t.partial({
//         id: t.string,
//         // https://github.com/gcanti/io-ts#union-of-string-literals
//         view: t.keyof({ archived: null }),
//       }),
//     }),
//   ]),
//   t.type({ pathname: t.literal('https://twitter.com/steida') }),
//   t.type({ pathname: t.literal('https://github.com/steida/actualtasks') }),
//   t.type({ pathname: t.literal('https://blockstream.info/address/13fJfcXAZncP1NnMNtpG1KxEYL514jtUy3') }), // prettier-ignore
//   t.type({ pathname: t.literal('https://github.com/steida/actualtasks/issues/new') }), // prettier-ignore
//   t.type({ pathname: t.literal('/me') }),
//   t.type({ pathname: t.literal('/add') }),
//   t.type({ pathname: t.literal('/help') }),
//   t.type({ pathname: t.literal('/archived') }),
//   t.type({
//     pathname: t.literal('/edit'),
//     query: t.type({ id: t.string }),
//   }),
//   t.intersection([
//     t.type({ pathname: t.literal('/blog') }),
//     t.partial({ query: t.type({ id: t.string }) }),
//   ]),
// ]);

// export type AppHref = t.TypeOf<typeof AppHrefIO>;

// const useAppHref = () => {
//   const { router } = useAppContext();

//   // This should be memoized globally. In serverless, it means per request :-)
//   const current = useMemo<AppHref | undefined>(() => {
//     let maybeAppHref: AppHref | undefined;
//     const routerAppHref = { pathname: router.pathname, query: router.query };
//     AppHrefIO.decode(routerAppHref).fold(
//       _errors => {}, // No need to report unmatched app href.
//       value => {
//         maybeAppHref = value;
//       },
//     );
//     return maybeAppHref;
//   }, [router.pathname, router.query]);

//   // Filter AppHref by pathname, then infer query.
//   type Query<T> = T extends { query?: infer Q } ? Q : undefined;
//   type QueryReturn<P> = Query<Extract<AppHref, { pathname: P }>> | undefined;

//   return useMemo(
//     () => ({
//       current,
//       push(href: AppHref) {
//         router.push(href);
//       },
//       query<P extends AppHref['pathname']>(pathname: P): QueryReturn<P> {
//         if (current == null || current.pathname !== pathname) return;
//         // @ts-ignore TODO: Type current.query somehow.
//         return current.query || undefined;
//       },
//     }),
//     [current, router],
//   );
// };

// export default useAppHref;
