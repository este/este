/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type WebsItem$ref = any;
import type { FragmentReference } from 'relay-runtime';
export opaque type Webs$ref: FragmentReference = FragmentReference;
export type Webs = {|
  +webs?: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: {|
        +id: string,
        +__fragments: WebsItem$ref,
      |},
    |}>,
  |},
  +$refType: Webs$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Webs",
  "type": "Query",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": null,
        "direction": "forward",
        "path": [
          "webs"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int!",
      "defaultValue": 100
    },
    {
      "kind": "LocalArgument",
      "name": "isAuthenticated",
      "type": "Boolean",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "isAuthenticated",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "webs",
          "name": "__Webs_webs_connection",
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
                      "kind": "FragmentSpread",
                      "name": "WebsItem",
                      "args": null
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
        }
      ]
    }
  ]
};
(node/*: any*/).hash = '8d82bf3d5955391326a1d560eed794f3';
module.exports = node;
