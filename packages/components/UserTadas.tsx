import React from 'react';
import { FormattedRelative, defineMessages } from 'react-intl';
import { Text, View } from 'react-native';
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from 'react-relay';
import { UserTadas_user } from '@app/relay/generated/UserTadas_user.graphql';
import { useAppContext } from '@app/hooks/useAppContext';
import { usePagination } from '@app/hooks/usePagination';
import { Link } from './Link';
import { Button } from './Button';

const messages = defineMessages({
  loadMoreTadas: {
    defaultMessage: 'Load More Tada',
    id: 'loadMoreTadas',
  },
  loadNextTadas: {
    defaultMessage: 'Load Next Tadas',
    id: 'loadNextTadas',
  },
  loadPreviousTadas: {
    defaultMessage: 'Load Previous Tadas',
    id: 'loadPreviousTadas',
  },
});
const subscription = graphql`
  subscription UserTadasPageSubscription($filters: PageSubcriptionFilters!) {
    userTadasConnection(filters: $filters) {
      edges {
        node {
          id
          name
          createdAt
        }
      }
    }
  }
`;

type UserTadasProps = {
  paginate?: boolean;
  relay: RelayPaginationProp;
  user: UserTadas_user;
};

const UserTadas: React.FunctionComponent<UserTadasProps> = ({
  paginate,
  relay,
  user,
}) => {
  const { intl, theme } = useAppContext();
  const { isLoading, next, previous } = usePagination({
    connectionKey: 'UserTadasFragment_tadas',
    paginate,
    relay,
    rootDataId: user.id,
    subscription,
    subscriptionName: 'userTadasConnection',
    totalCount: user.tadas.edges.length,
  });

  if (!user.tadas) {
    return null;
  }

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
    <>
      {user.tadas.edges.map(tada => {
        if (tada == null) return null;
        return (
          <View style={theme.marginBottom} key={tada.node.id}>
            <Text style={theme.text}>
              <Link href={{ pathname: '/tada', query: { id: tada.node.id } }}>
                {tada.node.name}
              </Link>
            </Text>
            <Text style={theme.textSmallGray}>
              <FormattedRelative value={tada.node.createdAt} />
            </Text>
          </View>
        );
      })}
      {paginate && (
        <View style={theme.buttons}>
          <Button
            type="text"
            disabled={!previous || isLoading}
            onPress={previous}
          >
            {intl.formatMessage(messages.loadPreviousTadas)}
          </Button>
          <Button type="text" disabled={!next || isLoading} onPress={next}>
            {intl.formatMessage(messages.loadNextTadas)}
          </Button>
        </View>
      )}
      {!paginate && (
        <View style={theme.buttons}>
          <Button type="text" disabled={!next || isLoading} onPress={next}>
            {intl.formatMessage(messages.loadMoreTadas)}
          </Button>
        </View>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default createPaginationContainer(
  UserTadas,
  {
    user: graphql`
      fragment UserTadas_user on User
        @argumentDefinitions(
          skip: { type: "Int", defaultValue: 0 }
          first: { type: "Int", defaultValue: 10 }
          userId: { type: "ID" }
        ) {
        id
        tadas(first: $first, skip: $skip)
          @connection(
            key: "UserTadasFragment_tadas"
            filters: ["first", "skip"]
          ) {
          edges {
            node {
              id
              name
              createdAt
            }
          }
        }
      }
    `,
  },
  {
    getConnectionFromProps(props) {
      return props.user && props.user.tadas;
    },
    getVariables(props, _paginationInfo, _fragmentVariables) {
      return {
        userId: props.user.id,
      };
    },
    query: graphql`
      query UserTadasPageQuery($userId: ID!, $first: Int!, $skip: Int) {
        user(id: $userId) {
          ...UserTadas_user
            @arguments(userId: $userId, first: $first, skip: $skip)
        }
      }
    `,
  },
);
