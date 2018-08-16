/**
 * @flow
 * @relayHash 8e4f87d62cc2fc3ff10eaac749b05b4f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Editor$ref = any;
export type pageQueryVariables = {|
  id: string
|};
export type pageQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Editor$ref
|};
export type pageQuery = {|
  variables: pageQueryVariables,
  response: pageQueryResponse,
|};
*/


/*
query pageQuery(
  $id: ID!
) {
  ...AppPage
  ...Editor_1Bmzm5
}

fragment AppPage on Query {
  me {
    themeName
    id
  }
}

fragment Editor_1Bmzm5 on Query {
  page(id: $id) {
    id
    title
    content
    web {
      ...EditMainNav
      id
    }
    ...PageTitle
  }
}

fragment EditMainNav on Web {
  id
  name
}

fragment PageTitle on Page {
  id
  title
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
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pageQuery",
  "id": null,
  "text": "query pageQuery(\n  $id: ID!\n) {\n  ...AppPage\n  ...Editor_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    themeName\n    id\n  }\n}\n\nfragment Editor_1Bmzm5 on Query {\n  page(id: $id) {\n    id\n    title\n    content\n    web {\n      ...EditMainNav\n      id\n    }\n    ...PageTitle\n  }\n}\n\nfragment EditMainNav on Web {\n  id\n  name\n}\n\nfragment PageTitle on Page {\n  id\n  title\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pageQuery",
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
    "name": "pageQuery",
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
        "name": "page",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "content",
            "args": null,
            "storageKey": null
          },
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
              },
              {
                "kind": "ScalarHandle",
                "alias": null,
                "name": "name",
                "args": null,
                "handle": "draft",
                "key": "",
                "filters": null
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
(node/*: any*/).hash = 'ce05ca5a39bac507381f7ea2cd22c8b5';
module.exports = node;
