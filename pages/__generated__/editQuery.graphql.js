/**
 * @flow
 * @relayHash c29da3e187fc47264a5d9ad3d976f645
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
    +title: string,
    +web: {|
      +name: string
    |},
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
    web {
      name
      id
    }
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
    title
    id
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
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
  "text": "query editQuery(\n  $pageId: ID!\n) {\n  page(pageId: $pageId) {\n    title\n    web {\n      name\n      id\n    }\n    id\n  }\n  ...Page\n  ...Editor_3AnMiB\n}\n\nfragment Page on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Editor_3AnMiB on Query {\n  page(pageId: $pageId) {\n    title\n    id\n  }\n}\n",
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
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "web",
            "storageKey": null,
            "args": null,
            "concreteType": "Web",
            "plural": false,
            "selections": [
              v3
            ]
          }
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "web",
            "storageKey": null,
            "args": null,
            "concreteType": "Web",
            "plural": false,
            "selections": [
              v3,
              v4
            ]
          },
          v4
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
          v4,
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
(node/*: any*/).hash = '8b4d79403375fbb89274ea5abcc7492b';
module.exports = node;
