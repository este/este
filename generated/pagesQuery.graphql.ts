/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { LayoutQuery$ref } from "./LayoutQuery.graphql";
declare const _pagesQuery$ref: unique symbol;
export type pagesQuery$ref = typeof _pagesQuery$ref;
export type pagesQuery = {
    readonly viewer: ({
        readonly id: string;
        readonly webs: ReadonlyArray<({
            readonly id: string;
            readonly name: string;
            readonly createdAt: any;
        }) | null> | null;
    }) | null;
    readonly " $fragmentRefs": LayoutQuery$ref;
    readonly " $refType": pagesQuery$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "pagesQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "LayoutQuery",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "viewer",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "webs",
          "storageKey": null,
          "args": null,
          "concreteType": "Web",
          "plural": true,
          "selections": [
            (v0/*: any*/),
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
              "name": "createdAt",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '9f24a04ede412522b97508fce87f9b70';
export default node;
