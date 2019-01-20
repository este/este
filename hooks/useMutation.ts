import React from 'react';
import { commitMutation, GraphQLTaggedNode } from 'react-relay';
import { Disposable } from 'relay-runtime';
import useAppContext from './useAppContext';

// TODO:
// 1) Fix all @ts-ignore.
// 2) Make initialState optional and partial with merge. Fix generared fields.

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
  // any, because of "@types/react-native": "^0.55.28"
  onValueChange: (value: any) => void;
  selectedValue: any;
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
    [key: string]:
      | ({
          errors?: { [key: string]: string | null } | null;
          [key: string]: any;
        })
      | null;
  };
  variables: { input: { [key: string]: string | number | boolean } };
}

type Input<M extends Mutation> = M['variables']['input'];

type Commit<M extends Mutation, N extends keyof M['response']> = (
  options?: {
    merge?: Partial<Input<M>>;
    onSuccess?: (response: NonNullable<M['response'][N]>) => void;
  },
) => void;

type Errors<M extends Mutation, N extends keyof M['response']> = NonNullable<
  NonNullable<M['response'][N]>['errors']
>;

type Pending = boolean;

interface Return<M extends Mutation, N extends keyof M['response']> {
  fields: Fields<Input<M>>;
  commit: Commit<M, N>;
  errors: Partial<Errors<M, N>>;
  pending: Pending;
  setState: (state: Input<M>) => void;
  state: Input<M>;
}

const useMutation = <M extends Mutation, N extends keyof M['response']>(
  mutation: GraphQLTaggedNode,
  initialState?: Input<M>,
  useMutationOptions?: {
    validator?: (input: Input<M>) => Errors<M, N>;
  },
): Return<M, N> => {
  // In the future, we will probably use Relay client state.
  const [state, setState] = React.useState<Input<M>>(initialState || {});
  const [errors, setErrors] = React.useState<Partial<Errors<M, N>>>({});
  const [pending, setPending] = React.useState<Pending>(false);
  const focusablesRef = React.useRef<{ [key: string]: Focusable | null }>({});
  const disposableRef = React.useRef<Disposable | null>(null);
  const { relayEnvironment } = useAppContext();

  React.useEffect(() => {
    return () => {
      if (disposableRef.current) disposableRef.current.dispose();
    };
  }, []);

  const fields = React.useMemo<Fields<Input<M>>>(
    () => {
      const createRef = (key: string) => (focusable: Focusable | null) => {
        focusablesRef.current[key] = focusable;
      };

      const createTextInput = (key: string): TextInputField => ({
        // blurOnSubmit true breaks focus on error on invalid field.
        blurOnSubmit: false,
        editable: !pending,
        onChangeText: (text: string) => {
          setState({ ...state, [key]: text });
        },
        ref: createRef(key),
        // @ts-ignore Fix me.
        value: state[key],
      });

      const createSwitch = (key: string): SwitchField => ({
        disabled: pending,
        onValueChange: (value: boolean) => {
          setState({ ...state, [key]: value });
        },
        ref: createRef(key),
        // @ts-ignore Fix me.
        value: state[key],
      });

      const createPicker = (key: string): PickerField => ({
        enabled: !pending,
        onValueChange: (value: string) => {
          setState({ ...state, [key]: value });
        },
        ref: createRef(key),
        selectedValue: state[key],
      });

      return Object.keys(state).reduce<Fields<Input<M>>>((fields, key) => {
        const value = state[key];
        // TODO: How to type field to detect wring props?
        const field =
          typeof value === 'boolean'
            ? { switch: createSwitch(key) }
            : {
                picker: createPicker(key),
                textInput: createTextInput(key),
              };
        return { ...fields, [key]: field };
        // @ts-ignore Fix me.
      }, {});
    },
    [state, pending],
  );

  const commit: Commit<M, N> = (commitOptions = {}) => {
    if (pending) return;

    const input = {
      ...state,
      ...commitOptions.merge,
    };

    // Find, set, and forus the first error only.
    // Sure we can set all errors at once, but I prefer less noisy UI.
    // The order is defined by object property order which is reliable:
    // https://stackoverflow.com/a/23202095/233902
    // Why not an array? Object is more handy for GraphQL.
    // Check api/schema.graphql SignInErrors type.
    const handleErrors = (errors: Errors<M, N>): { hasError: boolean } => {
      const error = Object.entries(errors).find(([_, value]) => value != null);
      if (error != null) {
        // @ts-ignore Not sure why
        setErrors({ [error[0]]: error[1] });
        const field = focusablesRef.current[error[0]];
        if (field) field.focus();
      } else {
        setErrors({});
      }
      return { hasError: error != null };
    };

    if (useMutationOptions && useMutationOptions.validator) {
      const errors = useMutationOptions.validator(input);
      if (handleErrors(errors).hasError) return;
    }

    setPending(true);

    if (disposableRef.current) disposableRef.current.dispose();

    disposableRef.current = commitMutation<M>(relayEnvironment, {
      mutation,
      variables: { input },
      onCompleted(response, _payloadErrors) {
        setPending(false);
        const firstResponse = response[Object.keys(response)[0]];
        const errors = (firstResponse && firstResponse.errors) || {};
        // @ts-ignore Fix me.
        if (handleErrors(errors).hasError) return;
        if (firstResponse == null) {
          // No response? The right thing to do is do nothing.
          // https://medium.com/@calebmer/when-to-use-graphql-non-null-fields-4059337f6fc8
          return;
        }
        if (commitOptions.onSuccess) {
          // @ts-ignore Fix me.
          commitOptions.onSuccess(firstResponse);
        }
      },
      onError(_error) {
        setPending(false);
        // console.log(_error);
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

export default useMutation;
