/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type PostType = "CHILDREN" | "IMAGE" | "TEXT";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostChild$ref: FragmentReference;
export type PostChild = {|
  +id: string,
  +text: ?string,
  +type: PostType,
  +$refType: PostChild$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "PostChild",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
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
      "name": "text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'f7213fd2bed8aa0afcca7314093047ec';
module.exports = node;
