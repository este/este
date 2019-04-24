import { ReactElement, FunctionComponent } from 'react';
import { withRouter, SingletonRouter } from 'next/router';

// Pass old React context into a new React context.

interface RouterProviderFixWithRouterProps {
  router: SingletonRouter;
  children: (router: SingletonRouter) => ReactElement<any>;
}

const RouterProviderFixWithRouter: FunctionComponent<
  RouterProviderFixWithRouterProps
> = props => {
  return props.children(props.router);
};

export const RouterProviderFix = withRouter(RouterProviderFixWithRouter);
