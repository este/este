/**
 * @flow
 * @relayHash b885dc6e63386fc1dd66248107263be7
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
      +title: string
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
      title
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetPageTitleInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "EditorPageTitleMutation",
  "id": null,
  "text": "mutation EditorPageTitleMutation(\n  $input: SetPageTitleInput!\n) {\n  setPageTitle(input: $input) {\n    page {\n      title\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditorPageTitleMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPageTitle",
        "storageKey": null,
        "args": v1,
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
              v2
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditorPageTitleMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPageTitle",
        "storageKey": null,
        "args": v1,
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
(node/*: any*/).hash = '662058140c50f948a00d2b5c49c0001b';
module.exports = node;
