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
  +edges: $ReadOnlyArray<?{|
    +node: {|
      +id: string,
      +__fragments: WebsItem$ref,
    |},
  |}>,
  +$refType: Webs$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Webs",
  "type": "WebConnection",
  "metadata": null,
  "argumentDefinitions": [],
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
            }
          ]
        }
      ]
    }
  ]
};
(node/*: any*/).hash = '8807ec330028cd6f3ff101f143277572';
module.exports = node;
