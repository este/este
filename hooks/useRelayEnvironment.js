// @flow
import { useContext } from 'react';
import EnvironmentContext from '../components/core/EnvironmentContext';

export default function useRelayEnvironment() {
  const context = useContext(EnvironmentContext);
  // if (context == null) throw Error('useRelayEnvironment: Please provide EnvironmentContext.');
  return context;
}
