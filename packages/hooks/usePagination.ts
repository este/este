import { useState, useCallback } from 'react';
import { GraphQLTaggedNode, RelayPaginationProp } from 'react-relay';
import { usePageSubscription } from './usePageSubscription';

export const usePagination = ({
  connectionKey,
  pageLength,
  paginate,
  relay,
  rootDataId,
  subscription,
  subscriptionName,
  totalCount,
  hasNextPage,
}: {
  connectionKey: string;
  pageLength: number;
  paginate?: boolean;
  relay: RelayPaginationProp;
  rootDataId: string;
  subscription: GraphQLTaggedNode;
  subscriptionName: string;
  totalCount: number;
  hasNextPage: boolean; // We can't trust RelayPaginationProp because of subscription updating the connection
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const first =
    paginate || totalCount < pageLength
      ? pageLength
      : currentPageNumber * pageLength;

  usePageSubscription({
    subscription,
    subscriptionName,
    connectionKey,
    rootDataId,
    first,
    skip: paginate ? (currentPageNumber - 1) * pageLength : 0,
  });

  const previous = useCallback(() => {
    setIsLoading(true);
    relay.refetchConnection(
      first,
      error => {
        setIsLoading(false);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentPageNumber(previousPageNumber => previousPageNumber - 1);
      },
      {
        first,
        skip: (currentPageNumber - 2) * first,
      },
    );
  }, [currentPageNumber, first]);

  const next = useCallback(() => {
    setIsLoading(true);

    const first = paginate ? pageLength : (currentPageNumber + 1) * pageLength;
    const skip = paginate ? currentPageNumber * pageLength : 0;

    relay.refetchConnection(
      first,
      error => {
        setIsLoading(false);
        if (error) {
          console.log(error);
          return;
        }
        setCurrentPageNumber(previousPageNumber => previousPageNumber + 1);
      },
      {
        first,
        skip,
      },
    );
  }, [currentPageNumber, pageLength, paginate]);

  return {
    isLoading,
    next: hasNextPage ? next : undefined,
    currentPageNumber,
    previous: paginate && currentPageNumber !== 1 ? previous : undefined,
  };
};
