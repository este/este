/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ViewerTheme_data$ref } from "./ViewerTheme_data.graphql";
import { me_data$ref } from "./me_data.graphql";
import { pages_data$ref } from "./pages_data.graphql";
import { signin_data$ref } from "./signin_data.graphql";
import { web_data$ref } from "./web_data.graphql";
export type AppQueryVariables = {
    readonly id: string;
    readonly isIndexPage: boolean;
    readonly isMePage: boolean;
    readonly isSignInPage: boolean;
    readonly isWebPage: boolean;
};
export type AppQueryResponse = {
    readonly " $fragmentRefs": ViewerTheme_data$ref & pages_data$ref & me_data$ref & signin_data$ref & web_data$ref;
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
  ...ViewerTheme_data
  ...pages_data @include(if: $isIndexPage)
  ...me_data @include(if: $isMePage)
  ...signin_data @include(if: $isSignInPage)
  ...web_data_1Bmzm5 @include(if: $isWebPage)
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
    webs {
      id
      name
      createdAt
    }
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

fragment web_data_1Bmzm5 on Query {
  ...Layout_data
  web(id: $id) {
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
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
        "condition": "isWebPage",
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "web_data",
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
                "name": "webs",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isMePage",
        "selections": [
          (v5/*: any*/),
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
          (v5/*: any*/)
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isWebPage",
        "selections": [
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "web",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "Web",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
    "text": "query AppQuery(\n  $id: ID!\n  $isIndexPage: Boolean!\n  $isMePage: Boolean!\n  $isSignInPage: Boolean!\n  $isWebPage: Boolean!\n) {\n  ...ViewerTheme_data\n  ...pages_data @include(if: $isIndexPage)\n  ...me_data @include(if: $isMePage)\n  ...signin_data @include(if: $isSignInPage)\n  ...web_data_1Bmzm5 @include(if: $isWebPage)\n}\n\nfragment ViewerTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n\nfragment pages_data on Query {\n  ...Layout_data\n  viewer {\n    id\n    webs {\n      id\n      name\n      createdAt\n    }\n  }\n}\n\nfragment me_data on Query {\n  ...Layout_data\n  ...SetUserTheme_data\n  requiredViewer {\n    email\n    id\n  }\n}\n\nfragment signin_data on Query {\n  ...Layout_data\n}\n\nfragment web_data_1Bmzm5 on Query {\n  ...Layout_data\n  web(id: $id) {\n    name\n    id\n  }\n}\n\nfragment Layout_data on Query {\n  viewer {\n    email\n    id\n  }\n}\n\nfragment SetUserTheme_data on Query {\n  viewer {\n    themeName\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '43db371d7599218101ba5b4c5511b51c';
export default node;
