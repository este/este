/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Editor$ref: FragmentReference;
export type Editor = {|
  +page: ?{|
    +title: string
  |},
  +$refType: Editor$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Editor",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "pageId",
      "type": "ID!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "page",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "pageId",
          "variableName": "pageId",
          "type": "ID!"
        }
      ],
      "concreteType": "Page",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'eb08989459f9aa1bf9c250e019800a34';
module.exports = node;
