/**
 * @flow
 * @relayHash 37c018d9ba5acc27a94dee6da06ebb48
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPageTitleInput = {
  id: string,
  title: string,
};
export type PageTitleMutationVariables = {|
  input: SetPageTitleInput
|};
export type PageTitleMutationResponse = {|
  +setPageTitle: ?{|
    +page: ?{|
      +title: string
    |}
  |}
|};
*/


/*
mutation PageTitleMutation(
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
  "name": "PageTitleMutation",
  "id": null,
  "text": "mutation PageTitleMutation(\n  $input: SetPageTitleInput!\n) {\n  setPageTitle(input: $input) {\n    page {\n      title\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PageTitleMutation",
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
    "name": "PageTitleMutation",
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
(node/*: any*/).hash = '9e1a95fe5c999bb9ec5cba9061e34749';
module.exports = node;
