/**
 * @flow
 * @relayHash 181072a0bc1c5c3b79f4a08080d00da0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Web$ref = any;
export type webQueryVariables = {|
  id: string,
  isWeb: boolean,
|};
export type webQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Web$ref
|};
export type webQuery = {|
  variables: webQueryVariables,
  response: webQueryResponse,
|};
*/


/*
query webQuery(
  $id: ID!
  $isWeb: Boolean!
) {
  ...AppPage_2atqod
  ...Web_1Bmzm5
}

fragment AppPage_2atqod on Query {
  me {
    themeName
    email
    id
  }
  web(id: $id) @include(if: $isWeb) {
    id
    name
  }
}

fragment Web_1Bmzm5 on Query {
  web(id: $id) {
    id
    ...WebName
    ...WebPages
  }
}

fragment WebName on Web {
  id
  name
}

fragment WebPages on Web {
  pages(orderBy: updatedAt_DESC) {
    id
    ...WebPagesItem
  }
}

fragment WebPagesItem on Page {
  id
  title
  updatedAt
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
    "name": "isWeb",
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
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "webQuery",
  "id": null,
  "text": "query webQuery(\n  $id: ID!\n  $isWeb: Boolean!\n) {\n  ...AppPage_2atqod\n  ...Web_1Bmzm5\n}\n\nfragment AppPage_2atqod on Query {\n  me {\n    themeName\n    email\n    id\n  }\n  web(id: $id) @include(if: $isWeb) {\n    id\n    name\n  }\n}\n\nfragment Web_1Bmzm5 on Query {\n  web(id: $id) {\n    id\n    ...WebName\n    ...WebPages\n  }\n}\n\nfragment WebName on Web {\n  id\n  name\n}\n\nfragment WebPages on Web {\n  pages(orderBy: updatedAt_DESC) {\n    id\n    ...WebPagesItem\n  }\n}\n\nfragment WebPagesItem on Page {\n  id\n  title\n  updatedAt\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "webQuery",
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
            "name": "isWeb",
            "variableName": "isWeb",
            "type": null
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "Web",
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
    "name": "webQuery",
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
        "name": "web",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
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
          },
          {
            "kind": "ScalarHandle",
            "alias": null,
            "name": "name",
            "args": null,
            "handle": "draft",
            "key": "",
            "filters": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pages",
            "storageKey": "pages(orderBy:\"updatedAt_DESC\")",
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "updatedAt_DESC",
                "type": "PageOrderByInput"
              }
            ],
            "concreteType": "Page",
            "plural": true,
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
                "kind": "ScalarField",
                "alias": null,
                "name": "updatedAt",
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
(node/*: any*/).hash = '6a63e8059cf63c8a8143336af3fa1579';
module.exports = node;
