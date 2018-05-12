// @flow
import * as React from 'react';
import createRelayEnvironment from '../app/createRelayEnvironment';
import type { Environment } from 'react-relay';

const MutationContext = React.createContext(
  (createRelayEnvironment(): Environment),
);

export default MutationContext;
