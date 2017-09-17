/**
 * @flow
 * @relayHash 1e14b26d687203e39f69233a9d2f9ca1
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SignupMutationVariables = {|
  signupInput: {
    websIds?: ?$ReadOnlyArray<string>;
    webs?: ?$ReadOnlyArray<{
      domain: string;
      name: string;
    }>;
    clientMutationId: string;
    authProvider: {
      email?: ?{
        email: string;
        password: string;
      };
    };
  };
  signinInput: {
    email?: ?{
      email: string;
      password: string;
    };
    clientMutationId: string;
  };
|};

export type SignupMutationResponse = {|
  +createUser: {|
    +user: ?{|
      +id: string;
    |};
  |};
  +signinUser: {|
    +token: ?string;
    +user: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation SignupMutation(
  $signupInput: SignupUserInput!
  $signinInput: SigninUserInput!
) {
  createUser(input: $signupInput) {
    user {
      id
    }
  }
  signinUser(input: $signinInput) {
    token
    user {
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "signupInput",
        "type": "SignupUserInput!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "signinInput",
        "type": "SigninUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "signupInput",
            "type": "SignupUserInput!"
          }
        ],
        "concreteType": "CreateUserPayload",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "signinInput",
            "type": "SigninUserInput!"
          }
        ],
        "concreteType": "SigninPayload",
        "name": "signinUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "SignupMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "signupInput",
        "type": "SignupUserInput!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "signinInput",
        "type": "SigninUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "SignupMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "signupInput",
            "type": "SignupUserInput!"
          }
        ],
        "concreteType": "CreateUserPayload",
        "name": "createUser",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "signinInput",
            "type": "SigninUserInput!"
          }
        ],
        "concreteType": "SigninPayload",
        "name": "signinUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation SignupMutation(\n  $signupInput: SignupUserInput!\n  $signinInput: SigninUserInput!\n) {\n  createUser(input: $signupInput) {\n    user {\n      id\n    }\n  }\n  signinUser(input: $signinInput) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
