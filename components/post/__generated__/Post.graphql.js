/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type PostContentType = "CHILDREN" | "IMAGE" | "TEXT";
import type { FragmentReference } from "relay-runtime";
declare export opaque type Post$ref: FragmentReference;
export type Post = {|
  +post: ?{|
    +id: string,
    +name: ?string,
    +web: {|
      +id: string,
      +name: string,
    |},
    +parents: ?$ReadOnlyArray<{|
      +id: string,
      +name: ?string,
    |}>,
    +contentType: ?PostContentType,
    +contentChildren: ?$ReadOnlyArray<{|
      +id: string,
      +name: ?string,
      +contentType: ?PostContentType,
      +contentText: ?string,
    |}>,
    +contentText: ?string,
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
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "contentType",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "contentText",
  "args": null,
  "storageKey": null
};
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
        v3,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "contentChildren",
          "storageKey": null,
          "args": null,
          "concreteType": "Post",
          "plural": true,
          "selections": [
            v0,
            v1,
            v3,
            v4
          ]
        },
        v4
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '087db08bc00de485772ad2687cae56f6';
module.exports = node;
