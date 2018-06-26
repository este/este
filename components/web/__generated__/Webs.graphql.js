/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type WebsItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Webs$ref: FragmentReference;
export type Webs = {|
  +me: ?{|
    +webs: ?$ReadOnlyArray<{|
      +id: string,
      +$fragmentRefs: WebsItem$ref,
    |}>
  |},
  +$refType: Webs$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Webs",
  "type": "Query",
  "metadata": null,
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
// prettier-ignore
(node/*: any*/).hash = 'f6ae964008107f616306f4711680ca00';
module.exports = node;
