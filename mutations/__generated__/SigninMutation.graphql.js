/**
 * @flow
 * @relayHash 14327ed35d1bced948eecb767d163497
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type SigninMutationVariables = {|
  email: string;
  password: string;
|};
export type SigninMutationResponse = {|
  +authenticateUser: ?{|
    +id: string;
    +token: string;
  |};
|};
*/


/*
mutation SigninMutation(
  $email: String!
  $password: String!
) {
  authenticateUser(email: $email, password: $password) {
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
    "name": "SigninMutation",
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
        "concreteType": "AuthenticateUserPayload",
        "name": "authenticateUser",
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
  "name": "SigninMutation",
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
    "name": "SigninMutation",
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
        "concreteType": "AuthenticateUserPayload",
        "name": "authenticateUser",
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
  "text": "mutation SigninMutation(\n  $email: String!\n  $password: String!\n) {\n  authenticateUser(email: $email, password: $password) {\n    id\n    token\n  }\n}\n"
};

module.exports = batch;
