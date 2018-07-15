/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type WebPostsItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type WebPosts$ref: FragmentReference;
export type WebPosts = {|
  +posts: ?$ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: WebPostsItem$ref,
  |}>,
  +$refType: WebPosts$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "WebPosts",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "posts",
      "storageKey": "posts(orderBy:\"updatedAt_DESC\",where:{\"name_not\":null})",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": "updatedAt_DESC",
          "type": "PostOrderByInput"
        },
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "name_not": null
          },
          "type": "PostWhereInput"
        }
      ],
      "concreteType": "Post",
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
          "name": "WebPostsItem",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '873622f8a7a2192bd100f0946a7e24cf';
module.exports = node;
