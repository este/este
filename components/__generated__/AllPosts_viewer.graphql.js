/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type AllPosts_viewer = {|
  +allPosts: {|
    +edges: ?$ReadOnlyArray<?{|
      +node: {|
        +id: string;
      |};
    |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "backward",
        "path": [
          "allPosts"
        ]
      }
    ]
  },
  "name": "AllPosts_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "allPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": "createdAt_DESC",
          "type": "PostOrderBy"
        }
      ],
      "concreteType": "PostConnection",
      "name": "__AllPosts_allPosts_connection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "args": null,
                  "name": "id",
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "Post_post",
                  "args": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__AllPosts_allPosts_connection{\"orderBy\":\"createdAt_DESC\"}"
    },
    {
      "kind": "FragmentSpread",
      "name": "Post_viewer",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
