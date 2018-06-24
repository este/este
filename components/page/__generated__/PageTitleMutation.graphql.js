/**
 * @flow
 * @relayHash ac5a8efd3707ef97e893b2fde370304a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED";
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
    |},
    +errors: ?{|
      +title: ?Max140CharsError
    |},
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
    errors {
      title
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
},
v3 = [
  v2
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "errors",
  "storageKey": null,
  "args": null,
  "concreteType": "SetPageTitleErrors",
  "plural": false,
  "selections": v3
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "PageTitleMutation",
  "id": null,
  "text": "mutation PageTitleMutation(\n  $input: SetPageTitleInput!\n) {\n  setPageTitle(input: $input) {\n    page {\n      title\n      id\n    }\n    errors {\n      title\n    }\n  }\n}\n",
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
            "selections": v3
          },
          v4
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
          },
          v4
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc2514aa2585fe595eca3b4fc8f2cd77';
module.exports = node;
