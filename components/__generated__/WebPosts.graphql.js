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
    +parents: ?$ReadOnlyArray<{|
      +id: string
    |}>,
    +$fragmentRefs: WebPostsItem$ref,
  |}>,
  +$refType: WebPosts$ref,
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
  "name": "WebPosts",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "posts",
      "storageKey": "posts(orderBy:\"updatedAt_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": "updatedAt_DESC",
          "type": "PostOrderByInput"
        }
      ],
      "concreteType": "Post",
      "plural": true,
      "selections": [
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "parents",
          "storageKey": null,
          "args": null,
          "concreteType": "Post",
          "plural": true,
          "selections": [
            v0
          ]
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
})();
// prettier-ignore
(node/*: any*/).hash = 'f4326dfe67c4956cbae0bdb7e6ee965e';
module.exports = node;
