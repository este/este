/**
 * @flow
 * @relayHash 70ab7abb12136bb47640c42d4e54c6c3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EmailError = "ALREADY_EXISTS" | "EMAIL" | "NOT_EXISTS" | "REQUIRED";
export type PasswordError = "MAX_1024_CHARS" | "MIN_5_CHARS" | "REQUIRED" | "WRONG_PASSWORD";
export type AuthInput = {
  email: string,
  password: string,
  isSignUp: boolean,
};
export type AuthMutationVariables = {|
  input: AuthInput
|};
export type AuthMutationResponse = {|
  +auth: ?{|
    +token: ?string,
    +errors: ?{|
      +email: ?EmailError,
      +password: ?PasswordError,
    |},
  |}
|};
export type AuthMutation = {|
  variables: AuthMutationVariables,
  response: AuthMutationResponse,
|};
*/


/*
mutation AuthMutation(
  $input: AuthInput!
) {
  auth(input: $input) {
    token
    errors {
      email
      password
    }
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
    "name": "auth",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "AuthErrors",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "password",
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
  "name": "AuthMutation",
  "id": null,
  "text": "mutation AuthMutation(\n  $input: AuthInput!\n) {\n  auth(input: $input) {\n    token\n    errors {\n      email\n      password\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AuthMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "AuthMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '036ca089f7bace00e716c2919edee08d';
module.exports = node;
