import React, { FunctionComponent } from 'react';
import { FormattedRelative } from 'react-intl';
import { Text, View } from 'react-native';
import { createPaginationContainer, graphql } from 'react-relay';
import { UserTeamates_user } from '@app/relay/generated/UserTeamates_user.graphql';
import { useAppContext } from '@app/hooks/useAppContext';
import UserTadas from './UserTadas';

interface UserTeamatesProps {
  user: UserTeamates_user;
}

const UserTeamates: FunctionComponent<UserTeamatesProps> = ({ user }) => {
  const { theme } = useAppContext();

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
    <>
      {user.teamates.edges.map(teamate => {
        if (teamate == null) return null;
        return (
          <View style={theme.marginBottom} key={teamate.node.id}>
            <Text style={theme.text}>{teamate.node.email}</Text>
            <Text style={theme.textSmallGray}>
              <FormattedRelative value={teamate.node.createdAt} />
            </Text>
            <UserTadas user={teamate.node} paginate />
          </View>
        );
      })}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default createPaginationContainer(
  UserTeamates,
  {
    user: graphql`
      fragment UserTeamates_user on User
        @argumentDefinitions(
          first: { type: "Int!", defaultValue: 10 }
          tadasFirst: { type: "Int" }
        ) {
        id
        teamates(first: $first)
          @connection(key: "UserTeamatesFragment_teamates") {
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
      return props.user && props.user.teamates;
    },
    getVariables(_props, _args, _fragmentVariables) {
      return {};
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query UserTeamatesPaginationQuery {
        viewer {
          ...UserTeamates_user
        }
      }
    `,
  },
);
