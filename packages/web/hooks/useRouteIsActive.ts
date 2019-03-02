import useAppContext from './useAppContext';
import { AppHref } from '../types';

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
