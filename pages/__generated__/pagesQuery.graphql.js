/**
 * @flow
 * @relayHash 2979d3e5dd11e57cf281ceea991a541c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Webs$ref = any;
export type pagesQueryVariables = {|
  isAuthenticated: boolean,
|};
export type pagesQueryResponse = {|
  +$fragmentRefs: Webs$ref,
|};
*/


/*
query pagesQuery(
  $isAuthenticated: Boolean!
) {
  ...Webs_39ngnn
}

fragment Webs_39ngnn on Query {
  webs(first: 100) @include(if: $isAuthenticated) {
    edges {
      node {
        id
        ...WebsItem
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment WebsItem on Web {
  updatedAt
  name
  domain
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "isAuthenticated",
    "type": "Boolean!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pagesQuery",
  "id": null,
  "text": "query pagesQuery(\n  $isAuthenticated: Boolean!\n) {\n  ...Webs_39ngnn\n}\n\nfragment Webs_39ngnn on Query {\n  webs(first: 100) @include(if: $isAuthenticated) {\n    edges {\n      node {\n        id\n        ...WebsItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment WebsItem on Web {\n  updatedAt\n  name\n  domain\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pagesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "Webs",
        "args": [
          {
            "kind": "Variable",
            "name": "isAuthenticated",
            "variableName": "isAuthenticated",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "pagesQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isAuthenticated",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "webs",
            "storageKey": "webs(first:100)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100,
                "type": "Int!"
              }
            ],
            "concreteType": "WebConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "WebEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Web",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "updatedAt",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "domain",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "webs",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100,
                "type": "Int!"
              }
            ],
            "handle": "connection",
            "key": "Webs_webs",
            "filters": null
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '29a5134f3dba2c440532af5a61948a25';
module.exports = node;
