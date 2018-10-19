/**
 * @flow
 * @relayHash 3a761969492a8d920568e077bb043b42
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Editor$ref = any;
export type editorQueryVariables = {|
  id: string,
  isPage: boolean,
|};
export type editorQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Editor$ref
|};
export type editorQuery = {|
  variables: editorQueryVariables,
  response: editorQueryResponse,
|};
*/


/*
query editorQuery(
  $id: ID!
  $isPage: Boolean!
) {
  ...AppPage_16EYnK
  ...Editor_1Bmzm5
}

fragment AppPage_16EYnK on Query {
  me {
    themeName
    id
  }
  ...MainNav_1ppZvl
}

fragment Editor_1Bmzm5 on Query {
  page(id: $id) {
    id
    title
  }
}

fragment MainNav_1ppZvl on Query {
  me {
    email
    id
  }
  page(id: $id) @include(if: $isPage) {
    id
    web {
      id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "isPage",
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
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "editorQuery",
  "id": null,
  "text": "query editorQuery(\n  $id: ID!\n  $isPage: Boolean!\n) {\n  ...AppPage_16EYnK\n  ...Editor_1Bmzm5\n}\n\nfragment AppPage_16EYnK on Query {\n  me {\n    themeName\n    id\n  }\n  ...MainNav_1ppZvl\n}\n\nfragment Editor_1Bmzm5 on Query {\n  page(id: $id) {\n    id\n    title\n  }\n}\n\nfragment MainNav_1ppZvl on Query {\n  me {\n    email\n    id\n  }\n  page(id: $id) @include(if: $isPage) {\n    id\n    web {\n      id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "editorQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": [
          {
            "kind": "Variable",
            "name": "isPage",
            "variableName": "isPage",
            "type": null
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "Editor",
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
    "name": "editorQuery",
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
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v2,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarHandle",
            "alias": null,
            "name": "title",
            "args": null,
            "handle": "draft",
            "key": "",
            "filters": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isPage",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "page",
            "storageKey": null,
            "args": v2,
            "concreteType": "Page",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "web",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": false,
                "selections": [
                  v1,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
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
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '84af631e1cdd8ad21ea806bd147e3ad6';
module.exports = node;
