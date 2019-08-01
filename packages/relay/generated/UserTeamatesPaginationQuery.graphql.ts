/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { UserTeamates_user$ref } from "./UserTeamates_user.graphql";
export type UserTeamatesPaginationQueryVariables = {};
export type UserTeamatesPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": UserTeamates_user$ref;
    } | null;
};
export type UserTeamatesPaginationQuery = {
    readonly response: UserTeamatesPaginationQueryResponse;
    readonly variables: UserTeamatesPaginationQueryVariables;
};



/*
query UserTeamatesPaginationQuery {
  viewer {
    ...UserTeamates_user
    id
  }
}

fragment UserTeamates_user on User {
  id
  teamates(first: 10) {
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
      endCursor
      hasNextPage
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserTeamatesPaginationQuery",
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
            "name": "UserTeamates_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserTeamatesPaginationQuery",
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
            "name": "teamates",
            "storageKey": "teamates(first:10)",
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
                          (v7/*: any*/)
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
              (v7/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "teamates",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "UserTeamatesFragment_teamates",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "UserTeamatesPaginationQuery",
    "id": null,
    "text": "query UserTeamatesPaginationQuery {\n  viewer {\n    ...UserTeamates_user\n    id\n  }\n}\n\nfragment UserTeamates_user on User {\n  id\n  teamates(first: 10) {\n    edges {\n      node {\n        id\n        email\n        createdAt\n        ...UserTadas_user_1VU2v9\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserTadas_user_1VU2v9 on User {\n  id\n  tadas(first: 10, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ad59e3ab1295a6b1f8d16b5bae062066';
export default node;
