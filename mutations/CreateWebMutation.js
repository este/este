// @flow
import { graphql, commitMutation } from 'react-relay';
import type { Environment, Id } from '../types';
import { Observable } from 'rxjs/Observable';
import type { CreateWebMutationVariables } from './__generated__/CreateWebMutation.graphql';

const mutation = graphql`
  mutation CreateWebMutation($input: CreateWebInput!) {
    createWeb(input: $input) {
      web {
        id
      }
    }
  }
`;

const commit = (
  environment: Environment,
  variables: CreateWebMutationVariables,
) =>
  Observable.create(observer => {
    commitMutation(environment, {
      mutation,
      variables,
      onCompleted: () => observer.next(),
      // Do not handle onError yet. Happy day scenarios only for now.
      // TODO: Handle global errors globally, probably via alert and Raven.
    });
  });

// Why CreateWebMutation.commit? Because it's explicit side-effect.
export default { commit };
