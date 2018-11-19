// @flow
import { useState, useEffect, useRef } from 'react';
import useRelayEnvironment from './useRelayEnvironment';
import {
  commitMutation,
  type Disposable,
  type RelayMutationConfig,
  type GraphQLTaggedNode,
  type UploadableMap,
  type SelectorStoreUpdater,
} from 'react-relay';

// Subset of react-relay MutationConfig type.
// Variables and event handlers are added in useMutation hook.
type Config = {|
  configs?: Array<RelayMutationConfig>,
  mutation: GraphQLTaggedNode,
  uploadables?: UploadableMap,
  optimisticUpdater?: ?SelectorStoreUpdater,
  optimisticResponse?: Object,
  updater?: ?SelectorStoreUpdater,
|};

type Input<Mutation> = $ElementType<
  $ElementType<Mutation, 'variables'>,
  'input',
>;

// Errors parametric type is carefully crafted, let me explain why.
// Errors are defined in server model. Properly generated Flow looks like this:
// From server/api/__generated__/api.graphql.js:
// export type AuthErrors = {|
//   email?: EmailError,
//   password?: PasswordError,
// |}
// It's the shape that validateAuth returns. But AuthMutation looks like that:
// +errors: ?{|
//   +email: ?EmailError,
//   +password: ?PasswordError,
// |},
// Note email and password props are not optional. That's correct, because we
// fetch both. But for compatibility with the rest of the code, we have to
// $Shape, NonMaybeType before, etc. and result must be made nullable again.
type Errors<Mutation, Name> = ?$Shape<
  $NonMaybeType<
    $ElementType<
      $NonMaybeType<$ElementType<$ElementType<Mutation, 'response'>, Name>>,
      'errors',
    >,
  >,
>;

type Commit<Mutation, Name> = (
  input: Input<Mutation>,
  onSuccess: ?(
    $NonMaybeType<$ElementType<$ElementType<Mutation, 'response'>, Name>>,
  ) => void,
) => void;

// ': Object' is must, otherwise https://github.com/facebook/flow/issues/7191.
// Maybe Name and name can be defined once, but I don't know how.
export default function useMutation<Mutation: Object, Name: string>(
  config: Config,
  name: Name,
  validate?: (Input<Mutation>) => Errors<Mutation, Name>,
): [Commit<Mutation, Name>, Errors<Mutation, Name>, boolean] {
  const environment = useRelayEnvironment();
  const disposableRef = useRef<Disposable>(null);
  const [errors, setErrors] = useState<Errors<Mutation, Name>>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    return () => {
      if (disposableRef.current) disposableRef.current.dispose();
    };
  }, []);

  function createOnCompleted(onSuccess) {
    return function onCompleted(response /* , payloadErrors */) {
      setPending(false);
      // Flow type refinement because of mixed.
      if (typeof response !== 'object' || response == null) return;
      const data = response[name];
      if (typeof data !== 'object' || data == null) return;
      const { errors } = data;
      setErrors(errors);
      if (errors != null) return;
      if (onSuccess) onSuccess(data);
    };
  }

  function commit(input, onSuccess) {
    if (validate) {
      const errors = validate(input);
      setErrors(errors);
      if (errors != null) return;
    }
    setPending(true);
    if (disposableRef.current) disposableRef.current.dispose();
    // Mixed, because I don't know how to type whole response properly.
    disposableRef.current = commitMutation<mixed>(environment, {
      ...config,
      variables: { input },
      onCompleted: createOnCompleted(onSuccess),
      onError(/* error */) {
        setPending(false);
      },
    });
  }

  // Pending is last, because mutations should be optimistic.
  // We can omit errors:
  // const [commit, , pending] = useFooMutation();
  return [commit, errors, pending];
}
