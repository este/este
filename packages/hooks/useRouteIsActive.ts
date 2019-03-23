import useAppContext from './useAppContext';
import { AppHref } from './useAppHref';

// TODO: Move to useAppHref jakmile to naimplementuju
// a pak nikde nepouzivat router!

// import useAppContext from '@app/hooks/useAppContext';
// import { AppHref } from '@app/hooks/useAppHref';
// import { useMemo } from 'react';

// // TODO: Zrusit nebo mergnout?
// // co hledam? potrebuju zjistit, jestli je href active
// // ok, to chci.
// const useRouteIsActive = (href: AppHref) => {
//   const { router } = useAppContext();
//   const hrefQuery = 'query' in href && href.query;
//   const isActive = useMemo(() => {
//     return (
//       href.pathname === router.pathname &&
//       JSON.stringify(hrefQuery || {}) === JSON.stringify(router.query || {})
//     );
//   }, [href.pathname, hrefQuery, router.pathname, router.query]);
//   return isActive;
// };

// export default useRouteIsActive;

const useRouteIsActive = (href: AppHref) => {
  const { router } = useAppContext();
  const linkPathname = typeof href === 'object' ? href.pathname : href;
  const linkQuery = typeof href === 'object' ? href.query : null;
  return (
    linkPathname === router.pathname &&
    JSON.stringify(linkQuery || {}) === JSON.stringify(router.query || {})
  );
};

export default useRouteIsActive;
