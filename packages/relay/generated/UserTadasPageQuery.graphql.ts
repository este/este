/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { UserTadas_user$ref } from "./UserTadas_user.graphql";
export type UserTadasPageQueryVariables = {
    readonly userId: string;
    readonly first: number;
    readonly skip?: number | null;
};
export type UserTadasPageQueryResponse = {
    readonly user: {
        readonly " $fragmentRefs": UserTadas_user$ref;
    } | null;
};
export type UserTadasPageQuery = {
    readonly response: UserTadasPageQueryResponse;
    readonly variables: UserTadasPageQueryVariables;
};



/*
query UserTadasPageQuery(
  $userId: ID!
  $first: Int!
  $skip: Int
) {
  user(id: $userId) {
    ...UserTadas_user_2gi4Xv
    id
  }
}

fragment UserTadas_user_2gi4Xv on User {
  id
  tadas(first: $first, skip: $skip) {
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
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "userId",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "skip",
    "type": "Int",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "skip",
  "variableName": "skip"
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserTadasPageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "UserTadas_user",
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "Variable",
                "name": "userId",
                "variableName": "userId"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "UserTadasPageQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "tadas",
            "storageKey": null,
            "args": (v5/*: any*/),
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
                      (v4/*: any*/),
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
                        "name": "createdAt",
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
            "name": "tadas",
            "args": (v5/*: any*/),
            "handle": "connection",
            "key": "UserTadasFragment_tadas",
            "filters": [
              "first",
              "skip"
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "UserTadasPageQuery",
    "id": null,
    "text": "query UserTadasPageQuery(\n  $userId: ID!\n  $first: Int!\n  $skip: Int\n) {\n  user(id: $userId) {\n    ...UserTadas_user_2gi4Xv\n    id\n  }\n}\n\nfragment UserTadas_user_2gi4Xv on User {\n  id\n  tadas(first: $first, skip: $skip) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '649ca734f4a047025d1b94eb6a9e0c71';
export default node;
