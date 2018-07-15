/**
 * @flow
 * @relayHash d5b34885f4498783cd5a006523eb5e9a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Post$ref = any;
export type postQueryVariables = {|
  id: string
|};
export type postQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Post$ref
|};
*/


/*
query postQuery(
  $id: ID!
) {
  ...AppPage
  ...Post_1Bmzm5
}

fragment AppPage on Query {
  me {
    themeName
    id
  }
}

fragment Post_1Bmzm5 on Query {
  post(id: $id) {
    id
    name
    text
    type
    web {
      id
      name
    }
    parents {
      id
      name
    }
    ...PostText
    children {
      id
      ...PostChild
    }
  }
}

fragment PostText on Post {
  id
  text
}

fragment PostChild on Post {
  id
  type
  ...PostText
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "text",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarHandle",
  "alias": null,
  "name": "text",
  "args": null,
  "handle": "draftText",
  "key": "",
  "filters": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v6 = [
  v1,
  v2
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "postQuery",
  "id": null,
  "text": "query postQuery(\n  $id: ID!\n) {\n  ...AppPage\n  ...Post_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    themeName\n    id\n  }\n}\n\nfragment Post_1Bmzm5 on Query {\n  post(id: $id) {\n    id\n    name\n    text\n    type\n    web {\n      id\n      name\n    }\n    parents {\n      id\n      name\n    }\n    ...PostText\n    children {\n      id\n      ...PostChild\n    }\n  }\n}\n\nfragment PostText on Post {\n  id\n  text\n}\n\nfragment PostChild on Post {\n  id\n  type\n  ...PostText\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "postQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Post",
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
    "name": "postQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
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
          v1
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "Post",
        "plural": false,
        "selections": [
          v1,
          v2,
          v3,
          v4,
          v5,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "web",
            "storageKey": null,
            "args": null,
            "concreteType": "Web",
            "plural": false,
            "selections": v6
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "parents",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": v6
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "children",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": [
              v1,
              v5,
              v3,
              v4
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8ed9a43a51f458a65825a1eeb6b21a61';
module.exports = node;
