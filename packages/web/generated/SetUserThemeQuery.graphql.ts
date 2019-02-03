/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _SetUserThemeQuery$ref: unique symbol;
export type SetUserThemeQuery$ref = typeof _SetUserThemeQuery$ref;
export type SetUserThemeQuery = {
    readonly viewer: ({
        readonly themeName: string;
    }) | null;
    readonly " $refType": SetUserThemeQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SetUserThemeQuery",
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
(node as any).hash = '4caed22209e351eb29528d137d665009';
export default node;
