// @flow
import * as React from 'react';
import { type IntlShape } from 'react-intl';

const IntlContext = React.createContext<?IntlShape>(null);

export default IntlContext;
