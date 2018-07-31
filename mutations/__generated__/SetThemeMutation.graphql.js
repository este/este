/**
 * @flow
 * @relayHash 5e1050d701ca0121655d6cf3fff93466
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetThemeInput = {
  themeName: string
};
export type SetThemeMutationVariables = {|
  input: SetThemeInput
|};
export type SetThemeMutationResponse = {|
  +setTheme: ?{|
    +user: ?{|
      +themeName: ?string
    |}
  |}
|};
export type SetThemeMutation = {|
  variables: SetThemeMutationVariables,
  response: SetThemeMutationResponse,
|};
*/


/*
mutation SetThemeMutation(
  $input: SetThemeInput!
) {
  setTheme(input: $input) {
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
    "type": "SetThemeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetThemeInput!"
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
  "name": "SetThemeMutation",
  "id": null,
  "text": "mutation SetThemeMutation(\n  $input: SetThemeInput!\n) {\n  setTheme(input: $input) {\n    user {\n      themeName\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetThemeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setTheme",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetThemePayload",
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
    "name": "SetThemeMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setTheme",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetThemePayload",
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
(node/*: any*/).hash = '99cf94b94b9f7c5834ac56a10462e946';
module.exports = node;
