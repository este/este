/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ViewerTheme_data$ref } from "./ViewerTheme_data.graphql";
import { me_data$ref } from "./me_data.graphql";
import { pages_data$ref } from "./pages_data.graphql";
import { signin_data$ref } from "./signin_data.graphql";
import { tada_data$ref } from "./tada_data.graphql";
export type AppQueryVariables = {
    readonly id: string;
    readonly isIndexPage: boolean;
    readonly isMePage: boolean;
    readonly isSignInPage: boolean;
    readonly isTadaPage: boolean;
};
export type AppQueryResponse = {
    readonly " $fragmentRefs": ViewerTheme_data$ref & pages_data$ref & me_data$ref & signin_data$ref & tada_data$ref;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery(
  $id: ID!
  $isIndexPage: Boolean!
  $isMePage: Boolean!
  $isSignInPage: Boolean!
  $isTadaPage: Boolean!
) {
  ...ViewerTheme_data
  ...pages_data @include(if: $isIndexPage)
  ...me_data @include(if: $isMePage)
  ...signin_data @include(if: $isSignInPage)
  ...tada_data_1Bmzm5 @include(if: $isTadaPage)
}

fragment ViewerTheme_data on Query {
  viewer {
    themeName
    id
  }
}

fragment pages_data on Query {
  ...Layout_data
  viewer {
    id
    ...UserTadas_user_3OVASn
    ...UserTeamates_user_1sPVUO
  }
}

fragment me_data on Query {
  ...Layout_data
  ...SetUserTheme_data
  requiredViewer {
    email
    id
  }
}

fragment signin_data on Query {
  ...Layout_data
}

fragment tada_data_1Bmzm5 on Query {
  ...Layout_data
  tada(id: $id) {
    name
    id
  }
}

fragment Layout_data on Query {
  viewer {
    email
    id
  }
}

fragment SetUserTheme_data on Query {
  viewer {
    themeName
    id
  }
}

fragment UserTadas_user_3OVASn on User {
  id
  tadas(first: 5, skip: 0) {
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

fragment UserTeamates_user_1sPVUO on User {
  id
  teamates(first: 10) {
    edges {
      node {
        id
        email
        createdAt
        ...UserTadas_user_4yQIxA
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

fragment UserTadas_user_4yQIxA on User {
  id
  tadas(first: 3, skip: 0) {
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
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isIndexPage",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isMePage",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isSignInPage",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isTadaPage",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "skip",
  "value": 0
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  (v4/*: any*/)
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v10 = {
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
},
v11 = [
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
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ]
      },
      (v9/*: any*/)
    ]
  },
  (v10/*: any*/)
],
v12 = [
  "first",
  "skip"
],
v13 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  (v4/*: any*/)
],
v15 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "viewer",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "ViewerTheme_data",
        "args": null
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isIndexPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "pages_data",
            "args": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isMePage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "me_data",
            "args": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isSignInPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "signin_data",
            "args": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isTadaPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "tada_data",
            "args": (v1/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AppQuery",
    "argumentDefinitions": (v0/*: any*/),
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
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          },
          (v2/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isIndexPage",
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
              (v3/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "tadas",
                "storageKey": "tadas(first:5,skip:0)",
                "args": (v5/*: any*/),
                "concreteType": "TadaConnection",
                "plural": false,
                "selections": (v11/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "tadas",
                "args": (v5/*: any*/),
                "handle": "connection",
                "key": "UserTadasFragment_tadas",
                "filters": (v12/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "teamates",
                "storageKey": "teamates(first:10)",
                "args": (v13/*: any*/),
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
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v7/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "tadas",
                            "storageKey": "tadas(first:3,skip:0)",
                            "args": (v14/*: any*/),
                            "concreteType": "TadaConnection",
                            "plural": false,
                            "selections": (v11/*: any*/)
                          },
                          {
                            "kind": "LinkedHandle",
                            "alias": null,
                            "name": "tadas",
                            "args": (v14/*: any*/),
                            "handle": "connection",
                            "key": "UserTadasFragment_tadas",
                            "filters": (v12/*: any*/)
                          },
                          (v8/*: any*/)
                        ]
                      },
                      (v9/*: any*/)
                    ]
                  },
                  (v10/*: any*/)
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "teamates",
                "args": (v13/*: any*/),
                "handle": "connection",
                "key": "UserTeamatesFragment_teamates",
                "filters": null
              }
            ]
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isMePage",
        "selections": [
          (v15/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "requiredViewer",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isSignInPage",
        "selections": [
          (v15/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isTadaPage",
        "selections": [
          (v15/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "tada",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Tada",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AppQuery",
    "id": null,
    "text": "query AppQuery(\n  $id: ID!\n  $isIndexPage: Boolean!\n  $isMePage: Boolean!\n  $isSignInPage: Boolean!\n  $isTadaPage: Boolean!\n) {\n  ...ViewerTheme_data\n  ...pages_data @include(if: $isIndexPage)\n  ...me_data @include(if: $isMePage)\n  ...signin_data @include(if: $isSignInPage)\n  ...tada_data_1Bmzm5 @include(if: $isTadaPage)\n}\n\nfragment ViewerTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment pages_data on Query {\n  ...Layout_data\n  viewer {\n    id\n    ...UserTadas_user_3OVASn\n    ...UserTeamates_user_1sPVUO\n  }\n}\n\nfragment me_data on Query {\n  ...Layout_data\n  ...SetUserTheme_data\n  requiredViewer {\n    email\n    id\n  }\n}\n\nfragment signin_data on Query {\n  ...Layout_data\n}\n\nfragment tada_data_1Bmzm5 on Query {\n  ...Layout_data\n  tada(id: $id) {\n    name\n    id\n  }\n}\n\nfragment Layout_data on Query {\n  viewer {\n    email\n    id\n  }\n}\n\nfragment SetUserTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment UserTadas_user_3OVASn on User {\n  id\n  tadas(first: 5, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserTeamates_user_1sPVUO on User {\n  id\n  teamates(first: 10) {\n    edges {\n      node {\n        id\n        email\n        createdAt\n        ...UserTadas_user_4yQIxA\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserTadas_user_4yQIxA on User {\n  id\n  tadas(first: 3, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e6df1f2373aca09938c419b6c1bcfe15';
export default node;
