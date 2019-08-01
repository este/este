import { useEffect } from 'react';
import { graphql, requestSubscription } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';

const subscription = graphql`
  subscription useViewerAccessibleTadaUpdatedSubscription {
    viewerAccessibleTadaUpdated {
      node {
        id
        name
        createdAt
      }
    }
  }
`;
export const useViewerAccessibleTadaUpdatedSubscription = () => {
  const { relayEnvironment } = useAppContext();

  useEffect(() => {
    const subscriptionConfig = {
      subscription,
      variables: {},
    };
    const subscriptionInstance = requestSubscription(
      relayEnvironment,
      subscriptionConfig,
    );
    return () => subscriptionInstance.dispose();
  }, []);
};
