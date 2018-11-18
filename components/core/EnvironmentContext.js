// @flow
import * as React from 'react';
import createRelayEnvironment from '../../client/createRelayEnvironment';
import type { Environment } from 'react-relay';

// TODO: ?Environment, remove createRelayEnvironment, handle null in useRelayEnvironment.
const EnvironmentContext = React.createContext<Environment>(
  createRelayEnvironment({ token: '' }),
);

export default EnvironmentContext;
