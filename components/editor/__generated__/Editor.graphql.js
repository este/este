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
  +web: ?{|
    +name: string
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
      "name": "domain",
      "type": "String!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "web",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "domain",
          "variableName": "domain",
          "type": "String!"
        }
      ],
      "concreteType": "Web",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'c1ab21a70ff68020960cc091be0cbf24';
module.exports = node;
