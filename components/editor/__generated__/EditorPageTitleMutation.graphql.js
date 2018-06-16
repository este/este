/**
 * @flow
 * @relayHash 83470a1ed03b33777fa8ada5652b378c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPageTitleInput = {
  id: string,
  title: string,
};
export type EditorPageTitleMutationVariables = {|
  input: SetPageTitleInput
|};
export type EditorPageTitleMutationResponse = {|
  +setPageTitle: ?{|
    +page: ?{|
      +id: string
    |}
  |}
|};
*/


/*
mutation EditorPageTitleMutation(
  $input: SetPageTitleInput!
) {
  setPageTitle(input: $input) {
    page {
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
    "type": "SetPageTitleInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setPageTitle",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPageTitleInput!"
      }
    ],
    "concreteType": "SetPageTitlePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": null,
        "concreteType": "Page",
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
  "name": "EditorPageTitleMutation",
  "id": null,
  "text": "mutation EditorPageTitleMutation(\n  $input: SetPageTitleInput!\n) {\n  setPageTitle(input: $input) {\n    page {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditorPageTitleMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "EditorPageTitleMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c958b7fe9ae223d592dd9feb98e8d590';
module.exports = node;
