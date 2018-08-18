/**
 * @flow
 * @relayHash 3bdcefcb901e8252e3e5d3eff5663e8d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Webs$ref = any;
export type pagesQueryVariables = {||};
export type pagesQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Webs$ref
|};
export type pagesQuery = {|
  variables: pagesQueryVariables,
  response: pagesQueryResponse,
|};
*/


/*
query pagesQuery {
  ...AppPage
  ...Webs
}

fragment AppPage on Query {
  me {
    themeName
    email
    id
  }
}

fragment Webs on Query {
  me {
    webs(orderBy: updatedAt_ASC) {
      id
      ...WebsItem
    }
    id
  }
}

fragment WebsItem on Web {
  name
  updatedAt
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pagesQuery",
  "id": null,
  "text": "query pagesQuery {\n  ...AppPage\n  ...Webs\n}\n\nfragment AppPage on Query {\n  me {\n    themeName\n    email\n    id\n  }\n}\n\nfragment Webs on Query {\n  me {\n    webs(orderBy: updatedAt_ASC) {\n      id\n      ...WebsItem\n    }\n    id\n  }\n}\n\nfragment WebsItem on Web {\n  name\n  updatedAt\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pagesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Webs",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "pagesQuery",
    "argumentDefinitions": [],
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          },
          v0,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "webs",
            "storageKey": "webs(orderBy:\"updatedAt_ASC\")",
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "updatedAt_ASC",
                "type": "WebOrderByInput"
              }
            ],
            "concreteType": "Web",
            "plural": true,
            "selections": [
              v0,
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
                "name": "updatedAt",
                "args": null,
                "storageKey": null
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
(node/*: any*/).hash = 'e8c77c475ac94b334fb2722d32d50b37';
module.exports = node;
