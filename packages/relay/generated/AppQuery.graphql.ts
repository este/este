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
    readonly teammatesTadasPageLength: number;
    readonly viewerTadasPageLength: number;
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
  $teammatesTadasPageLength: Int!
  $viewerTadasPageLength: Int!
) {
  ...ViewerTheme_data
  ...pages_data_1Ig3HR @include(if: $isIndexPage)
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

fragment pages_data_1Ig3HR on Query {
  ...Layout_data
  viewer {
    id
    ...UserTadas_user_8qnpt
    ...UserTeammates_user_1ZKL6
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

fragment UserTadas_user_8qnpt on User {
  id
  tadas(first: $viewerTadasPageLength, skip: 0) {
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

fragment UserTeammates_user_1ZKL6 on User {
  id
  teammates(first: 10) {
    edges {
      node {
        id
        email
        createdAt
        ...UserTadas_user_2oiQgv
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

fragment UserTadas_user_2oiQgv on User {
  id
  tadas(first: $teammatesTadasPageLength, skip: 0) {
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
  },
  {
    "kind": "LocalArgument",
    "name": "teammatesTadasPageLength",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "viewerTadasPageLength",
    "type": "Int!",
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
    "kind": "Variable",
    "name": "first",
    "variableName": "viewerTadasPageLength"
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
  "kind": "ScalarField",
  "alias": null,
  "name": "hasNextPage",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "endCursor",
  "args": null,
  "storageKey": null
},
v12 = [
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
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "pageInfo",
    "storageKey": null,
    "args": null,
    "concreteType": "PageInfo",
    "plural": false,
    "selections": [
      (v10/*: any*/),
      (v11/*: any*/)
    ]
  }
],
v13 = [
  "first",
  "skip"
],
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v15 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "teammatesTadasPageLength"
  },
  (v4/*: any*/)
],
v16 = {
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
            "args": [
              {
                "kind": "Variable",
                "name": "teammatesTadasPageLength",
                "variableName": "teammatesTadasPageLength"
              },
              {
                "kind": "Variable",
                "name": "viewerTadasPageLength",
                "variableName": "viewerTadasPageLength"
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
                "storageKey": null,
                "args": (v5/*: any*/),
                "concreteType": "TadaConnection",
                "plural": false,
                "selections": (v12/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "tadas",
                "args": (v5/*: any*/),
                "handle": "connection",
                "key": "UserTadasFragment_tadas",
                "filters": (v13/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "teammates",
                "storageKey": "teammates(first:10)",
                "args": (v14/*: any*/),
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
                            "storageKey": null,
                            "args": (v15/*: any*/),
                            "concreteType": "TadaConnection",
                            "plural": false,
                            "selections": (v12/*: any*/)
                          },
                          {
                            "kind": "LinkedHandle",
                            "alias": null,
                            "name": "tadas",
                            "args": (v15/*: any*/),
                            "handle": "connection",
                            "key": "UserTadasFragment_tadas",
                            "filters": (v13/*: any*/)
                          },
                          (v8/*: any*/)
                        ]
                      },
                      (v9/*: any*/)
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
                      (v11/*: any*/),
                      (v10/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "teammates",
                "args": (v14/*: any*/),
                "handle": "connection",
                "key": "UserTeammatesFragment_teammates",
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
          (v16/*: any*/),
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
          (v16/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isTadaPage",
        "selections": [
          (v16/*: any*/),
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
    "text": "query AppQuery(\n  $id: ID!\n  $isIndexPage: Boolean!\n  $isMePage: Boolean!\n  $isSignInPage: Boolean!\n  $isTadaPage: Boolean!\n  $teammatesTadasPageLength: Int!\n  $viewerTadasPageLength: Int!\n) {\n  ...ViewerTheme_data\n  ...pages_data_1Ig3HR @include(if: $isIndexPage)\n  ...me_data @include(if: $isMePage)\n  ...signin_data @include(if: $isSignInPage)\n  ...tada_data_1Bmzm5 @include(if: $isTadaPage)\n}\n\nfragment ViewerTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment pages_data_1Ig3HR on Query {\n  ...Layout_data\n  viewer {\n    id\n    ...UserTadas_user_8qnpt\n    ...UserTeammates_user_1ZKL6\n  }\n}\n\nfragment me_data on Query {\n  ...Layout_data\n  ...SetUserTheme_data\n  requiredViewer {\n    email\n    id\n  }\n}\n\nfragment signin_data on Query {\n  ...Layout_data\n}\n\nfragment tada_data_1Bmzm5 on Query {\n  ...Layout_data\n  tada(id: $id) {\n    name\n    id\n  }\n}\n\nfragment Layout_data on Query {\n  viewer {\n    email\n    id\n  }\n}\n\nfragment SetUserTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment UserTadas_user_8qnpt on User {\n  id\n  tadas(first: $viewerTadasPageLength, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment UserTeammates_user_1ZKL6 on User {\n  id\n  teammates(first: 10) {\n    edges {\n      node {\n        id\n        email\n        createdAt\n        ...UserTadas_user_2oiQgv\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment UserTadas_user_2oiQgv on User {\n  id\n  tadas(first: $teammatesTadasPageLength, skip: 0) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '113a4af1d3eeb81df5bf797241c4ec6f';
export default node;
