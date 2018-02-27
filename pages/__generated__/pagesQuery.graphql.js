/**
 * @flow
 * @relayHash 12de35c06fcab0f9d6731a5f055bd1a9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Page$ref = any;
type Webs$ref = any;
export type pagesQueryVariables = {| |};
export type pagesQueryResponse = {|
  +$fragmentRefs: (Page$ref & Webs$ref),
|};
*/


/*
query pagesQuery {
  ...Page
  ...Webs
}

fragment Page on Query {
  me {
    id
  }
}

fragment Webs on Query {
  webs(first: 100) {
    edges {
      node {
        id
        ...WebsItem
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

fragment WebsItem on Web {
  updatedAt
  name
  domain
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
  "text": "query pagesQuery {\n  ...Page\n  ...Webs\n}\n\nfragment Page on Query {\n  me {\n    id\n  }\n}\n\nfragment Webs on Query {\n  webs(first: 100) {\n    edges {\n      node {\n        id\n        ...WebsItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment WebsItem on Web {\n  updatedAt\n  name\n  domain\n  id\n}\n",
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
        "name": "Page",
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
          v0
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "webs",
        "storageKey": "webs(first:100)",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100,
            "type": "Int!"
          }
        ],
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
                  v0,
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
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "__typename",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cursor",
                "args": null,
                "storageKey": null
              }
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
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "webs",
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100,
            "type": "Int!"
          }
        ],
        "handle": "connection",
        "key": "Webs_webs",
        "filters": null
      }
    ]
  }
};
})();
(node/*: any*/).hash = 'b3695dd719fc73db35d893b56bed95cd';
module.exports = node;
