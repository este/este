/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EditMainNav$ref = any;
type WebName$ref = any;
type WebPosts$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Web$ref: FragmentReference;
export type Web = {|
  +web: ?{|
    +id: string,
    +draftName: string,
    +$fragmentRefs: EditMainNav$ref & WebName$ref & WebPosts$ref,
  |},
  +$refType: Web$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "Web",
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
      "name": "web",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
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
          "kind": "ScalarField",
          "alias": null,
          "name": "draftName",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "EditMainNav",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "WebName",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "WebPosts",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '3db4bf9b0eeec24ff8df257f14d23583';
module.exports = node;
