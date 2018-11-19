// @flow
import useRelayEnvironment from './useRelayEnvironment';
import { commitLocalUpdate as commitLocalUpdateOriginal } from 'relay-runtime';
import type { StoreUpdater } from 'react-relay';

export default function useStore() {
  const environment = useRelayEnvironment();
  function commitLocalUpdate(storeUpdater: StoreUpdater) {
    commitLocalUpdateOriginal(environment, storeUpdater);
  }
  return commitLocalUpdate;
}
