// @flow
import * as React from 'react';
import createRelayEnvironment from '../app/createRelayEnvironment';
import type { Environment } from 'react-relay';

const EnvironmentContext = React.createContext(
  // Must cast because createRelayEnvironment does returns any because
  // Environment type is not complete.
  (createRelayEnvironment(): Environment),
);

export default EnvironmentContext;
