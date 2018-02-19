/**
 * @flow
 * @relayHash e051e3ca8d70d32dfcf6235edcc5a17b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Webs$ref = any;
export type pagesQueryVariables = {|
  isAuthenticated: boolean,
|};
export type pagesQueryResponse = {|
  +webs?: ?{|
    +__fragments: Webs$ref,
  |},
|};
*/


/*
query pagesQuery(
  $isAuthenticated: Boolean!
) {
  webs @include(if: $isAuthenticated) {
    ...Webs
  }
}

fragment Webs on WebConnection {
  edges {
    node {
      id
      ...WebsItem
    }
  }
}

fragment WebsItem on Web {
  updatedAt
  name
  domain
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "isAuthenticated",
    "type": "Boolean!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pagesQuery",
  "id": null,
  "text": "query pagesQuery(\n  $isAuthenticated: Boolean!\n) {\n  webs @include(if: $isAuthenticated) {\n    ...Webs\n  }\n}\n\nfragment Webs on WebConnection {\n  edges {\n    node {\n      id\n      ...WebsItem\n    }\n  }\n}\n\nfragment WebsItem on Web {\n  updatedAt\n  name\n  domain\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pagesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isAuthenticated",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "webs",
            "storageKey": null,
            "args": null,
            "concreteType": "WebConnection",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Webs",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "pagesQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "isAuthenticated",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "webs",
            "storageKey": null,
            "args": null,
            "concreteType": "WebConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "WebEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Web",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "updatedAt",
                        "args": null,
                        "storageKey": null
                      },
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
                        "name": "domain",
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
    ]
  }
};
})();
(node/*: any*/).hash = '447587a4b8ef4ae08cb03139ab9904b3';
module.exports = node;
