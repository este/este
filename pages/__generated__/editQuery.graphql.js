/**
 * @flow
 * @relayHash f8287738344947a33c064f1a9782c2c5
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Editor$ref = any;
type Page$ref = any;
export type editQueryVariables = {|
  pageId: string
|};
export type editQueryResponse = {|
  +page: ?{|
    +title: string
  |},
  +$fragmentRefs: Page$ref & Editor$ref,
|};
*/


/*
query editQuery(
  $pageId: ID!
) {
  page(pageId: $pageId) {
    title
    id
  }
  ...Page
  ...Editor_3AnMiB
}

fragment Page on Query {
  me {
    id
    themeName
  }
}

fragment Editor_3AnMiB on Query {
  page(pageId: $pageId) {
    id
    title
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "pageId",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "pageId",
    "variableName": "pageId",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "editQuery",
  "id": null,
  "text": "query editQuery(\n  $pageId: ID!\n) {\n  page(pageId: $pageId) {\n    title\n    id\n  }\n  ...Page\n  ...Editor_3AnMiB\n}\n\nfragment Page on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Editor_3AnMiB on Query {\n  page(pageId: $pageId) {\n    id\n    title\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "editQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v1,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v2
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "Page",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Editor",
        "args": [
          {
            "kind": "Variable",
            "name": "pageId",
            "variableName": "pageId",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "editQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v1,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v2,
          v3
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '33d9f6dd0bf2e28b7d1fe55976d9abba';
module.exports = node;
