/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ViewerThemeQuery$ref } from "./ViewerThemeQuery.graphql";
import { meQuery$ref } from "./meQuery.graphql";
import { pagesQuery$ref } from "./pagesQuery.graphql";
import { signinQuery$ref } from "./signinQuery.graphql";
import { webQuery$ref } from "./webQuery.graphql";
export type AppQueryVariables = {
    readonly id: string;
    readonly isIndexPage: boolean;
    readonly isMePage: boolean;
    readonly isSignInPage: boolean;
    readonly isWebPage: boolean;
};
export type AppQueryResponse = {
    readonly " $fragmentRefs": ViewerThemeQuery$ref & pagesQuery$ref & meQuery$ref & signinQuery$ref & webQuery$ref;
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
  $isWebPage: Boolean!
) {
  ...ViewerThemeQuery
  ...pagesQuery @include(if: $isIndexPage)
  ...meQuery @include(if: $isMePage)
  ...signinQuery @include(if: $isSignInPage)
  ...webQuery_1Bmzm5 @include(if: $isWebPage)
}

fragment ViewerThemeQuery on Query {
  viewer {
    themeName
    id
  }
}

fragment pagesQuery on Query {
  ...LayoutQuery
  viewer {
    id
    webs {
      id
      name
      createdAt
    }
  }
}

fragment meQuery on Query {
  ...LayoutQuery
  ...SetUserThemeQuery
  requiredViewer {
    email
    id
  }
}

fragment signinQuery on Query {
  ...LayoutQuery
}

fragment webQuery_1Bmzm5 on Query {
  ...LayoutQuery
  web(id: $id) {
    name
    id
  }
}

fragment LayoutQuery on Query {
  viewer {
    email
    id
  }
}

fragment SetUserThemeQuery on Query {
  viewer {
    themeName
    id
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
    "name": "isWebPage",
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
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "viewer",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
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
        "name": "ViewerThemeQuery",
        "args": null
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isWebPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "webQuery",
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
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isSignInPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "signinQuery",
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
            "name": "meQuery",
            "args": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isIndexPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "pagesQuery",
            "args": null
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
          (v1/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isWebPage",
        "selections": [
          (v3/*: any*/),
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
              (v4/*: any*/),
              (v1/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isSignInPage",
        "selections": [
          (v3/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isMePage",
        "selections": [
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "requiredViewer",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v1/*: any*/)
            ]
          }
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
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "webs",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "createdAt",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
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
    "text": "query AppQuery(\n  $id: ID!\n  $isIndexPage: Boolean!\n  $isMePage: Boolean!\n  $isSignInPage: Boolean!\n  $isWebPage: Boolean!\n) {\n  ...ViewerThemeQuery\n  ...pagesQuery @include(if: $isIndexPage)\n  ...meQuery @include(if: $isMePage)\n  ...signinQuery @include(if: $isSignInPage)\n  ...webQuery_1Bmzm5 @include(if: $isWebPage)\n}\n\nfragment ViewerThemeQuery on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment pagesQuery on Query {\n  ...LayoutQuery\n  viewer {\n    id\n    webs {\n      id\n      name\n      createdAt\n    }\n  }\n}\n\nfragment meQuery on Query {\n  ...LayoutQuery\n  ...SetUserThemeQuery\n  requiredViewer {\n    email\n    id\n  }\n}\n\nfragment signinQuery on Query {\n  ...LayoutQuery\n}\n\nfragment webQuery_1Bmzm5 on Query {\n  ...LayoutQuery\n  web(id: $id) {\n    name\n    id\n  }\n}\n\nfragment LayoutQuery on Query {\n  viewer {\n    email\n    id\n  }\n}\n\nfragment SetUserThemeQuery on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '455566daeeaa31f58ada253f98a1b25e';
export default node;
