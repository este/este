/**
 * @flow
 * @relayHash 9d30234cbfbed2b32dfb0827e564bd6d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPageContentInput = {
  id: string,
  content: string,
};
export type SetPageContentMutationVariables = {|
  input: SetPageContentInput
|};
export type SetPageContentMutationResponse = {|
  +setPageContent: ?{|
    +page: ?{|
      +id: string
    |}
  |}
|};
export type SetPageContentMutation = {|
  variables: SetPageContentMutationVariables,
  response: SetPageContentMutationResponse,
|};
*/


/*
mutation SetPageContentMutation(
  $input: SetPageContentInput!
) {
  setPageContent(input: $input) {
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
    "type": "SetPageContentInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setPageContent",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPageContentInput!"
      }
    ],
    "concreteType": "SetPageContentPayload",
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
  "name": "SetPageContentMutation",
  "id": null,
  "text": "mutation SetPageContentMutation(\n  $input: SetPageContentInput!\n) {\n  setPageContent(input: $input) {\n    page {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPageContentMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SetPageContentMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'deb3417afb8296f812a332eed7ca9f0b';
module.exports = node;
