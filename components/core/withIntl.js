// @flow
import * as React from 'react';
import { injectIntl, type IntlShape } from 'react-intl';

// Fixed version of react-intl injectIntl.
// Btw, Flow example does not work with functional stateless components:
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
// https://github.com/facebook/flow/issues/5908#issuecomment-370188580
const withIntl = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { intl: IntlShape | void }>> => {
  const WithIntl = (props: Props) => <Component {...props} />;
  // $FlowFixMe A bug in react-intl flow-typed libdef.
  return injectIntl(WithIntl);
};

export default withIntl;
