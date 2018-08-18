/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type PageTitle$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Page$ref: FragmentReference;
export type Page = {|
  +page: ?{|
    +id: string,
    +title: string,
    +draftTitle: string,
    +$fragmentRefs: PageTitle$ref,
  |},
  +$refType: Page$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Page",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "id",
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
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
      "concreteType": "Page",
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
          "kind": "ScalarField",
          "alias": "title",
          "name": "__title_draft",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "draftTitle",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "PageTitle",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '51e2377ffc93d215adac0ad67d2d81a5';
module.exports = node;
