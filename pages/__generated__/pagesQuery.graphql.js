/**
 * @flow
 * @relayHash 95271006909160804b324543be06021f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WebList_viewer$ref = any;
export type pagesQueryVariables = {|
  filter?: ?{
    AND?: ?$ReadOnlyArray<{
      AND?: $ReadOnlyArray<any>,
      OR?: $ReadOnlyArray<any>,
      createdAt?: ?any,
      createdAt_not?: ?any,
      createdAt_in?: ?$ReadOnlyArray<any>,
      createdAt_not_in?: ?$ReadOnlyArray<any>,
      createdAt_lt?: ?any,
      createdAt_lte?: ?any,
      createdAt_gt?: ?any,
      createdAt_gte?: ?any,
      domain?: ?string,
      domain_not?: ?string,
      domain_in?: ?$ReadOnlyArray<string>,
      domain_not_in?: ?$ReadOnlyArray<string>,
      domain_lt?: ?string,
      domain_lte?: ?string,
      domain_gt?: ?string,
      domain_gte?: ?string,
      domain_contains?: ?string,
      domain_not_contains?: ?string,
      domain_starts_with?: ?string,
      domain_not_starts_with?: ?string,
      domain_ends_with?: ?string,
      domain_not_ends_with?: ?string,
      id?: ?string,
      id_not?: ?string,
      id_in?: ?$ReadOnlyArray<string>,
      id_not_in?: ?$ReadOnlyArray<string>,
      id_lt?: ?string,
      id_lte?: ?string,
      id_gt?: ?string,
      id_gte?: ?string,
      id_contains?: ?string,
      id_not_contains?: ?string,
      id_starts_with?: ?string,
      id_not_starts_with?: ?string,
      id_ends_with?: ?string,
      id_not_ends_with?: ?string,
      name?: ?string,
      name_not?: ?string,
      name_in?: ?$ReadOnlyArray<string>,
      name_not_in?: ?$ReadOnlyArray<string>,
      name_lt?: ?string,
      name_lte?: ?string,
      name_gt?: ?string,
      name_gte?: ?string,
      name_contains?: ?string,
      name_not_contains?: ?string,
      name_starts_with?: ?string,
      name_not_starts_with?: ?string,
      name_ends_with?: ?string,
      name_not_ends_with?: ?string,
      updatedAt?: ?any,
      updatedAt_not?: ?any,
      updatedAt_in?: ?$ReadOnlyArray<any>,
      updatedAt_not_in?: ?$ReadOnlyArray<any>,
      updatedAt_lt?: ?any,
      updatedAt_lte?: ?any,
      updatedAt_gt?: ?any,
      updatedAt_gte?: ?any,
      owner?: any,
    }>,
    OR?: $ReadOnlyArray<any>,
    createdAt?: ?any,
    createdAt_not?: ?any,
    createdAt_in?: ?$ReadOnlyArray<any>,
    createdAt_not_in?: ?$ReadOnlyArray<any>,
    createdAt_lt?: ?any,
    createdAt_lte?: ?any,
    createdAt_gt?: ?any,
    createdAt_gte?: ?any,
    domain?: ?string,
    domain_not?: ?string,
    domain_in?: ?$ReadOnlyArray<string>,
    domain_not_in?: ?$ReadOnlyArray<string>,
    domain_lt?: ?string,
    domain_lte?: ?string,
    domain_gt?: ?string,
    domain_gte?: ?string,
    domain_contains?: ?string,
    domain_not_contains?: ?string,
    domain_starts_with?: ?string,
    domain_not_starts_with?: ?string,
    domain_ends_with?: ?string,
    domain_not_ends_with?: ?string,
    id?: ?string,
    id_not?: ?string,
    id_in?: ?$ReadOnlyArray<string>,
    id_not_in?: ?$ReadOnlyArray<string>,
    id_lt?: ?string,
    id_lte?: ?string,
    id_gt?: ?string,
    id_gte?: ?string,
    id_contains?: ?string,
    id_not_contains?: ?string,
    id_starts_with?: ?string,
    id_not_starts_with?: ?string,
    id_ends_with?: ?string,
    id_not_ends_with?: ?string,
    name?: ?string,
    name_not?: ?string,
    name_in?: ?$ReadOnlyArray<string>,
    name_not_in?: ?$ReadOnlyArray<string>,
    name_lt?: ?string,
    name_lte?: ?string,
    name_gt?: ?string,
    name_gte?: ?string,
    name_contains?: ?string,
    name_not_contains?: ?string,
    name_starts_with?: ?string,
    name_not_starts_with?: ?string,
    name_ends_with?: ?string,
    name_not_ends_with?: ?string,
    updatedAt?: ?any,
    updatedAt_not?: ?any,
    updatedAt_in?: ?$ReadOnlyArray<any>,
    updatedAt_not_in?: ?$ReadOnlyArray<any>,
    updatedAt_lt?: ?any,
    updatedAt_lte?: ?any,
    updatedAt_gt?: ?any,
    updatedAt_gte?: ?any,
    owner?: any,
  },
  isAuthenticated: boolean,
|};
export type pagesQueryResponse = {|
  +viewer: {|
    +$fragmentRefs: WebList_viewer$ref,
  |},
|};
*/


/*
query pagesQuery(
  $filter: WebFilter
  $isAuthenticated: Boolean!
) {
  viewer {
    ...WebList_viewer
    id
  }
}

fragment WebList_viewer on Viewer {
  allWebs(filter: $filter, orderBy: createdAt_ASC, first: 100) @include(if: $isAuthenticated) {
    edges {
      node {
        id
        ...WebListItem_web
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

fragment WebListItem_web on Web {
  updatedAt
  domain
  owner {
    id
  }
  id
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "WebFilter",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isAuthenticated",
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
  "name": "pagesQuery",
  "id": null,
  "text": "query pagesQuery(\n  $filter: WebFilter\n  $isAuthenticated: Boolean!\n) {\n  viewer {\n    ...WebList_viewer\n    id\n  }\n}\n\nfragment WebList_viewer on Viewer {\n  allWebs(filter: $filter, orderBy: createdAt_ASC, first: 100) @include(if: $isAuthenticated) {\n    edges {\n      node {\n        id\n        ...WebListItem_web\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment WebListItem_web on Web {\n  updatedAt\n  domain\n  owner {\n    id\n  }\n  id\n  name\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pagesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "WebList_viewer",
            "args": null
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
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "isAuthenticated",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "allWebs",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "filter",
                    "variableName": "filter",
                    "type": "WebFilter"
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 100,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "orderBy",
                    "value": "createdAt_ASC",
                    "type": "WebOrderBy"
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
                          v1,
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
                            "name": "domain",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "owner",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "User",
                            "plural": false,
                            "selections": [
                              v1
                            ]
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
                "name": "allWebs",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "filter",
                    "variableName": "filter",
                    "type": "WebFilter"
                  },
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 100,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "orderBy",
                    "value": "createdAt_ASC",
                    "type": "WebOrderBy"
                  }
                ],
                "handle": "connection",
                "key": "WebList_allWebs",
                "filters": [
                  "filter",
                  "orderBy"
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
(node/*: any*/).hash = '40c8516ee6a77d2f8217d53661db110a';
module.exports = node;
