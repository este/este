// TODO: Replace alert with universal component.
/* eslint-env browser */
import { handleApiGraphQLError } from '@app/api/handleApiGraphQLError';
import Router from 'next/router';
import { useState, useRef, useEffect, useMemo } from 'react';
import { defineMessages } from 'react-intl';
import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import { Disposable, RecordSourceSelectorProxy } from 'relay-runtime';
import { useAppHref } from './useAppHref';
import { useAppContext } from './useAppContext';

const messages = defineMessages({
  forbidden: {
    defaultMessage: 'This action is forbidden.',
    id: 'useMutation.forbidden',
  },
  noInternetAccess: {
    defaultMessage: 'Please check your internet connection.',
    id: 'useMutation.noInternetAccess',
  },
  notFound: {
    defaultMessage: 'Not found.',
    id: 'useMutation.notFound',
  },
});

// While it's possible to have multiple fields (mutations) in one mutation,
// I don't think it's a good pattern for client usage. There are questions
// related to transactions, race conditions, and batching. I believe server
// API should provide well tailored mutation for such use case.
// Therefore, this Hook supports only the one mutation with the one input.
// https://graphql.org/learn/queries/#multiple-fields-in-mutations

interface Focusable {
  focus: () => void;
}

interface FocusableField {
  ref: (input: Focusable | null) => void;
}

interface TextInputField extends FocusableField {
  blurOnSubmit: boolean;
  editable: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

interface SwitchField extends FocusableField {
  disabled: boolean;
  onValueChange: (value: boolean) => void;
  value: boolean;
}

interface PickerField extends FocusableField {
  enabled: boolean;
  onValueChange: (value: string) => void;
  selectedValue: string;
}

type Field<Value> = Value extends boolean
  ? {
      switch: SwitchField;
    }
  : Value extends string
  ? {
      textInput: TextInputField;
      picker: PickerField;
    }
  : never;

type Fields<Input> = { [K in keyof Input]: Field<Input[K]> };

interface Mutation {
  response: {
    [key: string]: {
      errors?: { [key: string]: string | null } | null;
      [key: string]: unknown;
    };
  };
  variables: {
    input: { [key: string]: unknown };
  };
}

type Input<M extends Mutation> = M['variables']['input'];

type Response<M extends Mutation> = M['response'][keyof M['response']];

type Commit<M extends Mutation> = (options?: {
  merge?: Partial<Input<M>>;
  onSuccess?: (response: Response<M>) => void;
  optimisticResponse?: M['response'];
  optimisticUpdater?: (store: RecordSourceSelectorProxy) => void;
}) => void;

type Errors<M extends Mutation> = NonNullable<Response<M>['errors']>;

export const useMutation = <M extends Mutation>(
  mutation: GraphQLTaggedNode,
  initialState: Input<M>,
  useMutationOptions: {
    validator?: (input: Input<M>) => Errors<M>;
  } = {},
): {
  commit: Commit<M>;
  errors: Partial<Errors<M>>;
  fields: Fields<Input<M>>;
  pending: boolean;
  setState: (state: Input<M>) => void;
  state: Input<M>;
} => {
  const [state, setState] = useState<Input<M>>(initialState);
  const [errors, setErrors] = useState<Partial<Errors<M>>>({});
  const [pending, setPending] = useState(false);
  const focusablesRef = useRef<{ [key: string]: Focusable | null }>({});
  const disposableRef = useRef<Disposable | null>(null);
  const { intl, relayEnvironment } = useAppContext();
  const appHref = useAppHref();

  useEffect(() => {
    return () => {
      if (disposableRef.current) disposableRef.current.dispose();
    };
  }, []);

  const fields = useMemo<Fields<Input<M>>>(() => {
    const createRef = (key: string) => (focusable: Focusable | null) => {
      focusablesRef.current[key] = focusable;
    };

    const createTextInput = (key: string, value: string): TextInputField => ({
      // blurOnSubmit true breaks focus on error on invalid field.
      blurOnSubmit: false,
      editable: !pending,
      onChangeText: (text: string) => {
        setState({ ...state, [key]: text });
      },
      ref: createRef(key),
      value,
    });

    const createSwitch = (key: string, value: boolean): SwitchField => ({
      disabled: pending,
      onValueChange: (value: boolean) => {
        setState({ ...state, [key]: value });
      },
      ref: createRef(key),
      value,
    });

    const createPicker = (key: string, value: string): PickerField => ({
      enabled: !pending,
      onValueChange: (value: string) => {
        setState({ ...state, [key]: value });
      },
      ref: createRef(key),
      selectedValue: value,
    });

    return Object.keys(state).reduce<Fields<Input<M>>>(
      (fields, key) => {
        const value = state[key];
        const field: Field<boolean | string> | null =
          typeof value === 'boolean'
            ? { switch: createSwitch(key, value) }
            : typeof value === 'string'
            ? {
                picker: createPicker(key, value),
                textInput: createTextInput(key, value),
              }
            : null;
        if (field == null) return fields;
        return { ...fields, [key]: field };
      },
      // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
      {} as Fields<Input<M>>,
    );
  }, [state, pending]);

  const commit: Commit<M> = (commitOptions = {}) => {
    if (pending) return;
    const input = {
      ...state,
      ...commitOptions.merge,
    };
    if (commitOptions.merge != null) setState(input);
    const { optimisticResponse, optimisticUpdater } = commitOptions;

    // Find, set, and forus the first error only.
    // Sure we can set all errors at once, but I prefer less noisy UI.
    // The order is defined by object property order which is reliable:
    // https://stackoverflow.com/a/23202095/233902
    // Why not an array? Object is more handy for GraphQL.
    // Check api/schema.graphql SignInErrors type.
    const handleErrors = (errors: Errors<M>): { hasError: boolean } => {
      const error = Object.entries(errors).find(([, value]) => value != null);
      if (error != null && error[1] != null) {
        // @ts-ignore PR anyone?
        setErrors({ [error[0]]: error[1] });
        const field = focusablesRef.current[error[0]];
        if (field) field.focus();
      } else {
        setErrors({});
      }
      return { hasError: error != null };
    };

    if (useMutationOptions.validator) {
      const errors = useMutationOptions.validator(input);
      if (handleErrors(errors).hasError) return;
    }

    setPending(true);

    if (disposableRef.current) disposableRef.current.dispose();

    disposableRef.current = commitMutation<M>(relayEnvironment, {
      mutation,
      variables: { input },
      optimisticResponse,
      optimisticUpdater,
      onCompleted(response, payloadErrors) {
        setPending(false);
        if (payloadErrors) {
          handleApiGraphQLError(payloadErrors, {
            401() {
              appHref.replace({
                pathname: '/signin',
                query: { redirectUrl: Router.asPath || '' },
              });
            },
            403() {
              // eslint-disable-next-line no-alert
              alert(intl.formatMessage(messages.forbidden));
            },
            404() {
              // This should not happen with mutation.
              // eslint-disable-next-line no-alert
              alert(intl.formatMessage(messages.notFound));
            },
            unknown() {
              // eslint-disable-next-line no-alert
              alert(payloadErrors);
            },
          });
          return;
        }
        const firstResponse = response[Object.keys(response)[0]] as Response<M>;
        const errors = ((firstResponse && firstResponse.errors) ||
          {}) as Errors<M>;
        if (handleErrors(errors).hasError) return;
        if (commitOptions.onSuccess) {
          commitOptions.onSuccess(firstResponse);
        }
      },
      onError(error) {
        setPending(false);
        if (error == null) return;
        const isNetworkError = error.message === 'Failed to fetch';
        const message = isNetworkError
          ? intl.formatMessage(messages.noInternetAccess)
          : error.message;
        // eslint-disable-next-line no-alert
        alert(message);
      },
    });
  };

  return {
    commit,
    errors,
    fields,
    pending,
    setState,
    state,
  };
};
