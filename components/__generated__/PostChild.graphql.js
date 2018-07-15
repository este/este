/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type PostText$ref = any;
export type PostType = "CHILDREN" | "IMAGE" | "TEXT";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostChild$ref: FragmentReference;
export type PostChild = {|
  +id: string,
  +type: PostType,
  +$fragmentRefs: PostText$ref,
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
      "name": "type",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PostText",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '6f44044be435697bc46f656cd2a8fdad';
module.exports = node;
