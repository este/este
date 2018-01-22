/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type WebListItem_web$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type WebList_viewer$ref: FragmentReference;
export type WebList_viewer = {|
  +allWebs?: {|
    +edges: ?$ReadOnlyArray<?{|
      +node: {|
        +id: string,
        +$fragmentRefs: WebListItem_web$ref,
      |},
    |}>,
  |},
  +$refType: WebList_viewer$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "WebList_viewer",
  "type": "Viewer",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "allWebs"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "filter",
      "type": "WebFilter"
    },
    {
      "kind": "RootArgument",
      "name": "isAuthenticated",
      "type": "Boolean"
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
          "alias": "allWebs",
          "name": "__WebList_allWebs_connection",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "filter",
              "variableName": "filter",
              "type": "WebFilter"
            },
            {
              "kind": "Literal",
              "name": "orderBy",
              "value": "createdAt_ASC",
              "type": "WebOrderBy"
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "WebListItem_web",
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
(node/*: any*/).hash = '9a34b3f05550fdb67b6a2f5c5d2c6567';
module.exports = node;
