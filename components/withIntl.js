// @flow
import * as React from 'react';
import { injectIntl, type IntlShape } from 'react-intl';

// This is fixed version of react-intl injectIntl HOC.
// Maybe someone someday will fix flow-typed libdef.
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
// Note it does not work with functional stateless components.
// https://github.com/facebook/flow/issues/5908

const withIntl = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { intl: IntlShape | void }>> => {
  const WrapperComponent = (props: Props) => <Component {...props} />;
  const WithIntl = injectIntl(WrapperComponent);
  // $FlowFixMe react-intl flow-typed libdef is wrong. Return type overrides it.
  return WithIntl;
};

export default withIntl;
