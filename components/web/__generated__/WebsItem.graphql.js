/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type WebsItem$ref: FragmentReference;
export type WebsItem = {|
  +name: string,
  +updatedAt: any,
  +posts: ?$ReadOnlyArray<{|
    +id: string
  |}>,
  +$refType: WebsItem$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "WebsItem",
  "type": "Web",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "updatedAt",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "posts",
      "storageKey": "posts(first:1,orderBy:\"updatedAt_DESC\",where:{\"name_not\":null})",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1,
          "type": "Int"
        },
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
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '89404a508770bd3b4e15628dfb03c75e';
module.exports = node;
