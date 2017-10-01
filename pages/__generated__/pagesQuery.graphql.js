/**
 * @flow
 * @relayHash 5985e34790b1847dd3a0f5e9362577d5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type pagesQueryResponse = {|
  +viewer: {| |};
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
      }
    }
    ... on WebConnection {
      edges {
        cursor
        node {
          __typename
          id
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
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
    "kind": "Fragment",
    "metadata": null,
    "name": "pagesQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "WebList_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "pagesQuery",
  "query": {
    "argumentDefinitions": [
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
    "kind": "Root",
    "name": "pagesQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Viewer",
            "selections": [
              {
                "kind": "Condition",
                "passingValue": true,
                "condition": "isAuthenticated",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
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
                    "name": "allWebs",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "WebEdge",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Web",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "type": "Web",
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "updatedAt",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "domain",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "name": "owner",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "id",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "name",
                                    "storageKey": null
                                  }
                                ]
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "WebConnection",
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "WebEdge",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "cursor",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Web",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "__typename",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "PageInfo",
                            "name": "pageInfo",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "endCursor",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "hasNextPage",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
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
                    "name": "allWebs",
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
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query pagesQuery(\n  $filter: WebFilter\n  $isAuthenticated: Boolean!\n) {\n  viewer {\n    ...WebList_viewer\n    id\n  }\n}\n\nfragment WebList_viewer on Viewer {\n  allWebs(filter: $filter, orderBy: createdAt_ASC, first: 100) @include(if: $isAuthenticated) {\n    edges {\n      node {\n        id\n        ...WebListItem_web\n      }\n    }\n    ... on WebConnection {\n      edges {\n        cursor\n        node {\n          __typename\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment WebListItem_web on Web {\n  updatedAt\n  domain\n  owner {\n    id\n  }\n  id\n  name\n}\n"
};

module.exports = batch;
