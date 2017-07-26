/**
 * @flow
 * @relayHash 9f57f7ffee80aea56cc79e890643dfb3
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type graphqlQueryResponse = {|
  +viewer: {| |};
|};
*/


/*
query graphqlQuery {
  viewer {
    ...CreatePost_viewer
    ...AllPosts_viewer
    id
  }
}

fragment CreatePost_viewer on Viewer {
  id
}

fragment AllPosts_viewer on Viewer {
  allPosts(last: 100, orderBy: createdAt_DESC) {
    edges {
      node {
        id
        ...Post_post
      }
    }
    ... on PostConnection {
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
        hasPreviousPage
        startCursor
      }
    }
  }
  ...Post_viewer
}

fragment Post_post on Post {
  createdAt
  id
  text
}

fragment Post_viewer on Viewer {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "graphqlQuery",
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
            "name": "CreatePost_viewer",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "AllPosts_viewer",
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
  "name": "graphqlQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "graphqlQuery",
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
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "last",
                    "value": 100,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "orderBy",
                    "value": "createdAt_DESC",
                    "type": "PostOrderBy"
                  }
                ],
                "concreteType": "PostConnection",
                "name": "allPosts",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PostEdge",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Post",
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
                            "type": "Post",
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "createdAt",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "text",
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
                    "type": "PostConnection",
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "PostEdge",
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
                            "concreteType": "Post",
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "hasPreviousPage",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "startCursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": "allPosts{\"last\":100,\"orderBy\":\"createdAt_DESC\"}"
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "last",
                    "value": 100,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "orderBy",
                    "value": "createdAt_DESC",
                    "type": "PostOrderBy"
                  }
                ],
                "handle": "connection",
                "name": "allPosts",
                "key": "AllPosts_allPosts",
                "filters": [
                  "orderBy"
                ]
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query graphqlQuery {\n  viewer {\n    ...CreatePost_viewer\n    ...AllPosts_viewer\n    id\n  }\n}\n\nfragment CreatePost_viewer on Viewer {\n  id\n}\n\nfragment AllPosts_viewer on Viewer {\n  allPosts(last: 100, orderBy: createdAt_DESC) {\n    edges {\n      node {\n        id\n        ...Post_post\n      }\n    }\n    ... on PostConnection {\n      edges {\n        cursor\n        node {\n          __typename\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n  ...Post_viewer\n}\n\nfragment Post_post on Post {\n  createdAt\n  id\n  text\n}\n\nfragment Post_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
