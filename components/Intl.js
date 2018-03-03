// @flow
import * as React from 'react';
import { injectIntl, type IntlShape } from 'react-intl';

// This is workaround for broken injectIntl types.
// It does not handle passed props correctly.
// TODO: Remove it when react-intl libdef will be fixed.

type IntlProps = {|
  children: (intl: IntlShape) => React.Node,
|};

const Intl: React.ComponentType<IntlProps> = injectIntl(({ children, intl }) =>
  children(intl),
);

export default Intl;
