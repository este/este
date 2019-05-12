/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
declare const _pages_data$ref: unique symbol;
export type pages_data$ref = typeof _pages_data$ref;
export type pages_data = {
    readonly viewer: {
        readonly id: string;
        readonly webs: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly createdAt: any;
        }>;
    } | null;
    readonly " $fragmentRefs": Layout_data$ref;
    readonly " $refType": pages_data$ref;
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
  "name": "pages_data",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
    },
    {
      "kind": "FragmentSpread",
      "name": "Layout_data",
      "args": null
    }
  ]
};
})();
(node as any).hash = '320f914f53561b3d79cde978c426e71f';
export default node;
