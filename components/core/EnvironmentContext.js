// @flow
import * as React from 'react';
import createRelayEnvironment from '../../client/createRelayEnvironment';
import type { Environment } from 'react-relay';

const EnvironmentContext = React.createContext(
  // Cast to Environment, because createRelayEnvironment does not return it.
  // Not sure why.
  (createRelayEnvironment({ token: '' }): Environment),
);

export default EnvironmentContext;
