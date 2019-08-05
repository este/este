import { useEffect, useCallback } from 'react';
import { GraphQLTaggedNode, requestSubscription } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import {
  ConnectionHandler,
  RecordSourceSelectorProxy,
  PageInfo,
} from 'relay-runtime';

export type ConnectionData = {
  edges?: ReadonlyArray<any> | null;
  pageInfo?: Partial<PageInfo> | null;
};

export const usePageSubscription = ({
  rootDataId,
  connectionKey,
  first,
  skip = 0,
  subscription,
  subscriptionName,
}: {
  subscription: GraphQLTaggedNode;
  subscriptionName: string;
  rootDataId: string;
  connectionKey: string;
  first: number;
  skip?: number;
}) => {
  const { relayEnvironment } = useAppContext();
  const updater = useCallback(
    (store: RecordSourceSelectorProxy) => {
      const rootField = store.getRootField(subscriptionName);
      const rootData = store.get(rootDataId);
      if (rootField && rootData) {
        const connection = ConnectionHandler.getConnection(
          rootData,
          connectionKey,
          { first, skip },
        );
        if (connection) {
          const newEdges = rootField.getLinkedRecords('edges');
          const newPageInfo = rootField.getLinkedRecord('pageInfo');
          newEdges && connection.setLinkedRecords(newEdges, 'edges');
          newPageInfo && connection.setLinkedRecord(newPageInfo, 'pageInfo');
        }
      }
    },
    [subscription, subscriptionName, rootDataId, subscriptionName, first, skip],
  );
  useEffect(() => {
    const subscriptionConfig = {
      subscription,
      variables: { filters: { first, skip, rootDataId } },
      updater,
    };
    const subscriptionInstance = requestSubscription(
      relayEnvironment,
      subscriptionConfig,
    );
    return () => subscriptionInstance.dispose();
  }, [
    subscription,
    subscriptionName,
    rootDataId,
    subscriptionName,
    first,
    skip,
  ]);
};
