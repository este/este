/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type WebsItem$ref: FragmentReference;
export type WebsItem = {|
  +name: string,
  +updatedAt: any,
  +pages: ?$ReadOnlyArray<{|
    +id: string
  |}>,
  +$refType: WebsItem$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "WebsItem",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "pages",
      "storageKey": "pages(first:1,orderBy:\"updatedAt_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1,
          "type": "Int"
        },
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5f03fecac2218b953ad96549a88010bd';
module.exports = node;
