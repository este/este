/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type WebPagesItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type WebPages$ref: FragmentReference;
export type WebPages = {|
  +pages: ?$ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: WebPagesItem$ref,
  |}>,
  +$refType: WebPages$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "WebPages",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "pages",
      "storageKey": "pages(orderBy:\"updatedAt_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": "updatedAt_DESC",
          "type": "PageOrderByInput"
        }
      ],
      "concreteType": "Page",
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
          "name": "WebPagesItem",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '671341ff00f27d521e93ad0ee8827841';
module.exports = node;
