/**
 * @flow
 * @relayHash 711a6a30b2cbd65ce90873c4e2be09e3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AuthInput = {
  email: string,
  password: string,
};
export type SignupMutationVariables = {|
  input: AuthInput
|};
export type SignupMutationResponse = {|
  +signup: ?{|
    +token: string
  |}
|};
*/


/*
mutation SignupMutation(
  $input: AuthInput!
) {
  signup(input: $input) {
    token
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "AuthInput!",
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
        "name": "input",
        "variableName": "input",
        "type": "AuthInput!"
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SignupMutation",
  "id": null,
  "text": "mutation SignupMutation(\n  $input: AuthInput!\n) {\n  signup(input: $input) {\n    token\n  }\n}\n",
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
// prettier-ignore
(node/*: any*/).hash = 'c5b1d4d0108ce15f74b5ff70c99d4fcb';
module.exports = node;
