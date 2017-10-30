/**
 * @flow
 * @relayHash b2b1a9098be93db2f44053318b69ca75
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SignupMutationVariables = {|
  email: string;
  password: string;
|};
export type SignupMutationResponse = {|
  +signupUser: ?{|
    +id: string;
    +token: string;
  |};
|};
*/


/*
mutation SignupMutation(
  $email: String!
  $password: String!
) {
  signupUser(email: $email, password: $password) {
    id
    token
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "email",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "password",
        "type": "String!",
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
            "name": "email",
            "variableName": "email",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password",
            "type": "String!"
          }
        ],
        "concreteType": "SignupUserPayload",
        "name": "signupUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
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
        "name": "email",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "password",
        "type": "String!",
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
            "name": "email",
            "variableName": "email",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password",
            "type": "String!"
          }
        ],
        "concreteType": "SignupUserPayload",
        "name": "signupUser",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation SignupMutation(\n  $email: String!\n  $password: String!\n) {\n  signupUser(email: $email, password: $password) {\n    id\n    token\n  }\n}\n"
};

module.exports = batch;
