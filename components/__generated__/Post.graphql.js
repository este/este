/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type PostChild$ref = any;
type PostText$ref = any;
export type PostType = "CHILDREN" | "IMAGE" | "TEXT";
import type { FragmentReference } from "relay-runtime";
declare export opaque type Post$ref: FragmentReference;
export type Post = {|
  +post: ?{|
    +id: string,
    +name: ?string,
    +text: ?string,
    +type: PostType,
    +web: {|
      +id: string,
      +name: string,
    |},
    +parents: ?$ReadOnlyArray<{|
      +id: string,
      +name: ?string,
    |}>,
    +children: ?$ReadOnlyArray<{|
      +id: string,
      +$fragmentRefs: PostChild$ref,
    |}>,
    +$fragmentRefs: PostText$ref,
  |},
  +$refType: Post$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  v0,
  v1
];
return {
  "kind": "Fragment",
  "name": "Post",
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
      "name": "post",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
      "concreteType": "Post",
      "plural": false,
      "selections": [
        v0,
        v1,
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
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "web",
          "storageKey": null,
          "args": null,
          "concreteType": "Web",
          "plural": false,
          "selections": v2
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "parents",
          "storageKey": null,
          "args": null,
          "concreteType": "Post",
          "plural": true,
          "selections": v2
        },
        {
          "kind": "FragmentSpread",
          "name": "PostText",
          "args": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "children",
          "storageKey": null,
          "args": null,
          "concreteType": "Post",
          "plural": true,
          "selections": [
            v0,
            {
              "kind": "FragmentSpread",
              "name": "PostChild",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '12f2db60d8a858d78fc72de21f0ced87';
module.exports = node;
