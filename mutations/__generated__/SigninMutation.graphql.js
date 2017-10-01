/**
 * @flow
 * @relayHash 418bce7fdd5695c9676a5bc0b7b22056
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SigninMutationVariables = {|
  signinInput: {
    email?: ?{
      email: string;
      password: string;
    };
    clientMutationId: string;
  };
|};
export type SigninMutationResponse = {|
  +signinUser: {|
    +token: ?string;
    +user: ?{|
      +id: string;
    |};
  |};
|};
*/


/*
mutation SigninMutation(
  $signinInput: SigninUserInput!
) {
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
        "name": "signinInput",
        "type": "SigninUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SigninMutation",
    "selections": [
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
  "name": "SigninMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "signinInput",
        "type": "SigninUserInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "SigninMutation",
    "operation": "mutation",
    "selections": [
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
  "text": "mutation SigninMutation(\n  $signinInput: SigninUserInput!\n) {\n  signinUser(input: $signinInput) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
