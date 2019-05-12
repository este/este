/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Layout_data$ref: unique symbol;
export type Layout_data$ref = typeof _Layout_data$ref;
export type Layout_data = {
    readonly viewer: {
        readonly email: string;
    } | null;
    readonly " $refType": Layout_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Layout_data",
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
(node as any).hash = '2767304cfa7a6fc63e7e5cc22feff773';
export default node;
