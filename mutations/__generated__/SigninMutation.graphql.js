/**
 * @flow
 * @relayHash eaadfbc8004cf78fa82a82e1778b017b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SigninMutationVariables = {|
  email: string,
  password: string,
|};
export type SigninMutationResponse = {|
  +authenticateUser: ?{|
    +id: string,
    +token: string,
  |},
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
    "name": "authenticateUser",
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
    "concreteType": "AuthenticateUserPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SigninMutation",
  "id": null,
  "text": "mutation SigninMutation(\n  $email: String!\n  $password: String!\n) {\n  authenticateUser(email: $email, password: $password) {\n    id\n    token\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SigninMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SigninMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '6b00e4356b07fbae931e8cb16d552030';
module.exports = node;
