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
(node/*: any*/).hash = '8d62dfb159293e1aad6effb47d000f2e';
module.exports = node;
