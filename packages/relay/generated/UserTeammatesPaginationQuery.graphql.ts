/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { UserTeammates_user$ref } from "./UserTeammates_user.graphql";
export type UserTeammatesPaginationQueryVariables = {};
export type UserTeammatesPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": UserTeammates_user$ref;
    } | null;
};
export type UserTeammatesPaginationQuery = {
    readonly response: UserTeammatesPaginationQueryResponse;
    readonly variables: UserTeammatesPaginationQueryVariables;
};



/*
query UserTeammatesPaginationQuery {
  viewer {
    ...UserTeammates_user
    id
  }
}

fragment UserTeammates_user on User {
  id
  teammates(first: 10) {
    edges {
      node {
        id
        email
        createdAt
        ...UserTadas_user_1VU2v9
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

fragment UserTadas_user_1VU2v9 on User {
  id
  tadas(first: 10, skip: 0) {
    edges {
      node {
        id
        name
        createdAt
        __typename
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v2 = [
  (v1/*: any*/)
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "skip",
    "value": 0
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "hasNextPage",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserTeammatesPaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "UserTeammates_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserTeammatesPaginationQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "teammates",
            "storageKey": "teammates(first:10)",
            "args": (v2/*: any*/),
            "concreteType": "UserConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "UserEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "email",
                        "args": null,
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "tadas",
                        "storageKey": "tadas(first:10,skip:0)",
                        "args": (v4/*: any*/),
                        "concreteType": "TadaConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "TadaEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Tada",
                                "plural": false,
                                "selections": [
                                  (v0/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "name",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  (v3/*: any*/),
                                  (v5/*: any*/)
                                ]
                              },
                              (v6/*: any*/)
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
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "tadas",
                        "args": (v4/*: any*/),
                        "handle": "connection",
                        "key": "UserTadasFragment_tadas",
                        "filters": [
                          "first",
                          "skip"
                        ]
                      },
                      (v5/*: any*/)
                    ]
                  },
                  (v6/*: any*/)
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
                  (v8/*: any*/),
                  (v7/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "teammates",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "UserTeammatesFragment_teammates",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "UserTeammatesPaginationQuery",
    "id": null,
    "text": "query UserTeammatesPaginationQuery {\n  viewer {\n    ...UserTeammates_user\n    id\n  }\n}\n\nfragment UserTeammates_user on User {\n  id\n  teammates(first: 10) {\n    edges {\n      node {\n        id\n        email\n        createdAt\n        ...UserTadas_user_1VU2v9\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserTadas_user_1VU2v9 on User {\n  id\n  tadas(first: 10, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5200b5491161bb965a8e135e1e61dfb8';
export default node;
