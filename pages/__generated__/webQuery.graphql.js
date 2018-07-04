/**
 * @flow
 * @relayHash 3852dcfd3ceb52188f47413a5a565d90
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Web$ref = any;
export type webQueryVariables = {|
  id: string
|};
export type webQueryResponse = {|
  +web: ?{|
    +id: string
  |},
  +$fragmentRefs: AppPage$ref & Web$ref,
|};
*/


/*
query webQuery(
  $id: ID!
) {
  web(id: $id) {
    id
  }
  ...AppPage
  ...Web_1Bmzm5
}

fragment AppPage on Query {
  me {
    id
    themeName
  }
}

fragment Web_1Bmzm5 on Query {
  web(id: $id) {
    id
    name
    ...WebPosts
  }
}

fragment WebPosts on Web {
  posts(orderBy: updatedAt_DESC, where: {name_not: null}) {
    id
    ...WebPostsItem
  }
}

fragment WebPostsItem on Post {
  id
  name
  updatedAt
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
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
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "webQuery",
  "id": null,
  "text": "query webQuery(\n  $id: ID!\n) {\n  web(id: $id) {\n    id\n  }\n  ...AppPage\n  ...Web_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Web_1Bmzm5 on Query {\n  web(id: $id) {\n    id\n    name\n    ...WebPosts\n  }\n}\n\nfragment WebPosts on Web {\n  posts(orderBy: updatedAt_DESC, where: {name_not: null}) {\n    id\n    ...WebPostsItem\n  }\n}\n\nfragment WebPostsItem on Post {\n  id\n  name\n  updatedAt\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "webQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "web",
        "storageKey": null,
        "args": v1,
        "concreteType": "Web",
        "plural": false,
        "selections": [
          v2
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Web",
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
  "operation": {
    "kind": "Operation",
    "name": "webQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "web",
        "storageKey": null,
        "args": v1,
        "concreteType": "Web",
        "plural": false,
        "selections": [
          v2,
          v3,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
            "storageKey": "posts(orderBy:\"updatedAt_DESC\",where:{\"name_not\":null})",
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "updatedAt_DESC",
                "type": "PostOrderByInput"
              },
              {
                "kind": "Literal",
                "name": "where",
                "value": {
                  "name_not": null
                },
                "type": "PostWhereInput"
              }
            ],
            "concreteType": "Post",
            "plural": true,
            "selections": [
              v2,
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "updatedAt",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '224772394398e63482d492bfac9a4ee2';
module.exports = node;
