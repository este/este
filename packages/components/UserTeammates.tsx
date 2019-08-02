import React, { FunctionComponent } from 'react';
import { FormattedRelative } from 'react-intl';
import { Text, View } from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';
import { UserTeammates_user } from '@app/relay/generated/UserTeammates_user.graphql';
import { useAppContext } from '@app/hooks/useAppContext';
import UserTadas from './UserTadas';

interface UserTeammatesProps {
  user: UserTeammates_user;
}

const UserTeammates: FunctionComponent<UserTeammatesProps> = ({ user }) => {
  const { theme } = useAppContext();

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
    <>
      {user.teammates.edges.map(teammate => {
        if (teammate == null) return null;
        return (
          <View style={theme.marginBottom} key={teammate.node.id}>
            <Text style={theme.text}>{teammate.node.email}</Text>
            <Text style={theme.textSmallGray}>
              <FormattedRelative value={teammate.node.createdAt} />
            </Text>
            <UserTadas user={teammate.node} paginate />
          </View>
        );
      })}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default createPaginationContainer(
  UserTeammates,
  {
    user: graphql`
      fragment UserTeammates_user on User
        @argumentDefinitions(
          first: { type: "Int!", defaultValue: 10 }
          tadasFirst: { type: "Int" }
        ) {
        id
        teammates(first: $first)
          @connection(key: "UserTeammatesFragment_teammates") {
          edges {
            node {
              id
              email
              createdAt
              ...UserTadas_user @arguments(first: $tadasFirst)
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.teammates;
    },
    getVariables(_props, _args, _fragmentVariables) {
      return {};
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query UserTeammatesPaginationQuery {
        viewer {
          ...UserTeammates_user
        }
      }
    `,
  },
);
