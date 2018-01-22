/**
 * @flow
 * @relayHash 3046380e004bcd1e59f7aea901d034c7
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
  +signupUser: ?{|
    +id: string,
    +token: string,
  |},
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
    "name": "signupUser",
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
    "concreteType": "SignupUserPayload",
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
  "name": "SignupMutation",
  "id": null,
  "text": "mutation SignupMutation(\n  $email: String!\n  $password: String!\n) {\n  signupUser(email: $email, password: $password) {\n    id\n    token\n  }\n}\n",
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
(node/*: any*/).hash = '9d89320c81c07c2ee94a442630e55867';
module.exports = node;
