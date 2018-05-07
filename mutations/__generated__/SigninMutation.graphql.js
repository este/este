/**
 * @flow
 * @relayHash d6d9b6b408f5a4b551d05c8606d57b22
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AuthInput = {
  email: string,
  password: string,
};
export type SigninMutationVariables = {|
  input: AuthInput
|};
export type SigninMutationResponse = {|
  +signin: ?{|
    +token: string
  |}
|};
*/


/*
mutation SigninMutation(
  $input: AuthInput!
) {
  signin(input: $input) {
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
    "name": "signin",
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
  "name": "SigninMutation",
  "id": null,
  "text": "mutation SigninMutation(\n  $input: AuthInput!\n) {\n  signin(input: $input) {\n    token\n  }\n}\n",
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
// prettier-ignore
(node/*: any*/).hash = '0cef6962a37d4105cbc8b20fb12c5a2e';
module.exports = node;
