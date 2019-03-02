import React from 'react';
import { withRouter, SingletonRouter } from 'next/router';

// Pass old React context into a new React context.

interface RouterProviderFixProps {
  router: SingletonRouter;
  children: (router: SingletonRouter) => React.ReactElement<any>;
}

const RouterProviderFix: React.FunctionComponent<
  RouterProviderFixProps
> = props => {
  return props.children(props.router);
};

export default withRouter(RouterProviderFix);
