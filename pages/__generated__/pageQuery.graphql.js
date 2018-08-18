/**
 * @flow
 * @relayHash 2f9a4a20945bd0f26b3b4a2cd57753ac
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Editor$ref = any;
export type pageQueryVariables = {|
  id: string,
  isPage: boolean,
|};
export type pageQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Editor$ref
|};
export type pageQuery = {|
  variables: pageQueryVariables,
  response: pageQueryResponse,
|};
*/


/*
query pageQuery(
  $id: ID!
  $isPage: Boolean!
) {
  ...AppPage_16EYnK
  ...Editor_1Bmzm5
}

fragment AppPage_16EYnK on Query {
  me {
    themeName
    email
    id
  }
  page(id: $id) @include(if: $isPage) {
    id
    web {
      id
      name
    }
  }
}

fragment Editor_1Bmzm5 on Query {
  page(id: $id) {
    id
    title
    content
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isPage",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pageQuery",
  "id": null,
  "text": "query pageQuery(\n  $id: ID!\n  $isPage: Boolean!\n) {\n  ...AppPage_16EYnK\n  ...Editor_1Bmzm5\n}\n\nfragment AppPage_16EYnK on Query {\n  me {\n    themeName\n    email\n    id\n  }\n  page(id: $id) @include(if: $isPage) {\n    id\n    web {\n      id\n      name\n    }\n  }\n}\n\nfragment Editor_1Bmzm5 on Query {\n  page(id: $id) {\n    id\n    title\n    content\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": [
          {
            "kind": "Variable",
            "name": "isPage",
            "variableName": "isPage",
            "type": null
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "Editor",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "pageQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v2,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarHandle",
            "alias": null,
            "name": "title",
            "args": null,
            "handle": "draft",
            "key": "",
            "filters": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "content",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isPage",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "page",
            "storageKey": null,
            "args": v2,
            "concreteType": "Page",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "web",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": false,
                "selections": [
                  v1,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
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
(node/*: any*/).hash = '9b193b7f5a3d80f131c29fe4db7fbf18';
module.exports = node;
