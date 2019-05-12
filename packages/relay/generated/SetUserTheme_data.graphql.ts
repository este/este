/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _SetUserTheme_data$ref: unique symbol;
export type SetUserTheme_data$ref = typeof _SetUserTheme_data$ref;
export type SetUserTheme_data = {
    readonly viewer: {
        readonly themeName: string;
    } | null;
    readonly " $refType": SetUserTheme_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SetUserTheme_data",
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
(node as any).hash = '329178ebb07a75167f8716288697b62c';
export default node;
