import { useState, useMemo, useCallback } from 'react';
import { GraphQLTaggedNode, RelayPaginationProp } from 'react-relay';
import { usePageSubscription } from './usePageSubscription';

export const usePagination = ({
  connectionKey,
  paginate,
  rootDataId,
  relay,
  subscription,
  subscriptionName,
  totalCount,
}: {
  connectionKey: string;
  paginate?: boolean;
  relay: RelayPaginationProp;
  rootDataId: string;
  subscription: GraphQLTaggedNode;
  subscriptionName: string;
  totalCount: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const pageLength = useMemo(() => totalCount, []);

  usePageSubscription({
    subscription,
    subscriptionName,
    connectionKey,
    rootDataId,
    first: paginate ? pageLength : totalCount,
    skip: paginate ? (currentPageNumber - 1) * pageLength : 0,
  });

  const previous = useCallback(() => {
    setIsLoading(true);
    relay.refetchConnection(
      pageLength,
      error => {
        setIsLoading(false);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentPageNumber(previousPageNumber => previousPageNumber - 1);
      },
      {
        first: pageLength,
        skip: (currentPageNumber - 2) * pageLength,
      },
    );
  }, [currentPageNumber, pageLength]);

  const next = useCallback(() => {
    const newTotal = totalCount + pageLength;
    setIsLoading(true);
    relay.refetchConnection(
      paginate ? pageLength : newTotal,
      error => {
        setIsLoading(false);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentPageNumber(previousPageNumber => previousPageNumber + 1);
      },
      {
        ...(paginate
          ? {
              first: pageLength,
              skip: currentPageNumber * pageLength,
            }
          : { first: newTotal, skip: 0 }),
      },
    );
  }, [totalCount, currentPageNumber, pageLength]);

  return {
    isLoading,
    next: relay.hasMore() ? next : undefined,
    currentPageNumber,
    previous: paginate && currentPageNumber !== 1 ? previous : undefined,
  };
};
