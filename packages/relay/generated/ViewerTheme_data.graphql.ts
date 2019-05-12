/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ViewerTheme_data$ref: unique symbol;
export type ViewerTheme_data$ref = typeof _ViewerTheme_data$ref;
export type ViewerTheme_data = {
    readonly viewer: {
        readonly themeName: string;
    } | null;
    readonly " $refType": ViewerTheme_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewerTheme_data",
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
          "name": "themeName",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'fd344baed38f1244a8e5fd6bdf0d4574';
export default node;
