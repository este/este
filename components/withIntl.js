// @flow
import * as React from 'react';
import { injectIntl, type IntlShape } from 'react-intl';

// This is fixed version of react-intl injectIntl HOC.
// Maybe someone someday will fix flow-typed libdef.
// This example does not work with functional stateless components:
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
// This works:
// https://github.com/facebook/flow/issues/5908#issuecomment-370246840

const withIntl = <C: React.ComponentType<*>>(
  Component: C,
): React.ComponentType<
  $Diff<React.ElementProps<C>, { intl: IntlShape | void }>,
> => {
  const WrapperComponent = (props: React.ElementProps<C>) => (
    <Component {...props} />
  );
  return injectIntl(WrapperComponent);
};

export default withIntl;
