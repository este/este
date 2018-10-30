// @flow
import * as React from 'react';
import createRelayEnvironment from '../../client/createRelayEnvironment';
import type { Environment } from 'react-relay';

const EnvironmentContext = React.createContext<Environment>(
  createRelayEnvironment({ token: '' }),
);

export default EnvironmentContext;
