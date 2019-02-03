/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _LayoutQuery$ref: unique symbol;
export type LayoutQuery$ref = typeof _LayoutQuery$ref;
export type LayoutQuery = {
    readonly viewer: ({
        readonly email: string;
    }) | null;
    readonly " $refType": LayoutQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "LayoutQuery",
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'fbee27b8985f0127a3630ad53781d90a';
export default node;
