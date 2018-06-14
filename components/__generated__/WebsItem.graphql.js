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
  +updatedAt: any,
  +name: string,
  +id: string,
  +pages: ?$ReadOnlyArray<{|
    +id: string
  |}>,
  +$refType: WebsItem$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "WebsItem",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    v0,
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
        v0
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '9180962ac47543a60bd2823651b4492b';
module.exports = node;
