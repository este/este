/**
 * @flow
 * @relayHash da7c8dbe2d45a04aa106aa4ac7e8b2b5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SignupMutationVariables = {|
  email: string,
  password: string,
|};
export type SignupMutationResponse = {|
  +signup: {|
    +token: string,
    +user: {|
      +id: string,
    |},
  |},
|};
*/


/*
mutation SignupMutation(
  $email: String!
  $password: String!
) {
  signup(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "signup",
    "storageKey": null,
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
    "concreteType": "AuthPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SignupMutation",
  "id": null,
  "text": "mutation SignupMutation(\n  $email: String!\n  $password: String!\n) {\n  signup(email: $email, password: $password) {\n    token\n    user {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SignupMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SignupMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '178e627d73a54e072e83841b3a3da1a9';
module.exports = node;
