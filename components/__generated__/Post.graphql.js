/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type EditMainNav$ref = any;
type PostChild$ref = any;
type PostName$ref = any;
type PostParents$ref = any;
type PostText$ref = any;
export type PostType = "CHILDREN" | "IMAGE" | "TEXT";
import type { FragmentReference } from "relay-runtime";
declare export opaque type Post$ref: FragmentReference;
export type Post = {|
  +post: ?{|
    +id: string,
    +name: ?string,
    +draftName: string,
    +text: ?string,
    +type: PostType,
    +web: {|
      +$fragmentRefs: EditMainNav$ref
    |},
    +children: ?$ReadOnlyArray<{|
      +id: string,
      +$fragmentRefs: PostChild$ref,
    |}>,
    +$fragmentRefs: PostParents$ref & PostName$ref & PostText$ref,
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
        {
          "kind": "ScalarField",
          "alias": "name",
          "name": "__name_draft",
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
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "EditMainNav",
              "args": null
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "PostParents",
          "args": null
        },
        {
          "kind": "FragmentSpread",
          "name": "PostName",
          "args": null
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
(node/*: any*/).hash = '430bde0c36301e0fd9d6c80580a5d49d';
module.exports = node;
