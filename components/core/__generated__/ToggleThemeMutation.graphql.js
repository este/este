/**
 * @flow
 * @relayHash 36360ab50cf4310a504582aac7cef746
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateUserInput = {
  themeName: string
};
export type ToggleThemeMutationVariables = {|
  input: UpdateUserInput
|};
export type ToggleThemeMutationResponse = {|
  +updateUser: ?{|
    +user: ?{|
      +themeName: ?string
    |}
  |}
|};
*/


/*
mutation ToggleThemeMutation(
  $input: UpdateUserInput!
) {
  updateUser(input: $input) {
    user {
      themeName
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "UpdateUserInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "themeName",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ToggleThemeMutation",
  "id": null,
  "text": "mutation ToggleThemeMutation(\n  $input: UpdateUserInput!\n) {\n  updateUser(input: $input) {\n    user {\n      themeName\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ToggleThemeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "UpdateUserPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v2
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ToggleThemeMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "updateUser",
        "storageKey": null,
        "args": v1,
        "concreteType": "UpdateUserPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v2,
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
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3a1a18a484aeb6c153d819cedca52ae8';
module.exports = node;
