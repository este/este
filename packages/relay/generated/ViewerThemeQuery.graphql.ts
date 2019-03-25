/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ViewerThemeQuery$ref: unique symbol;
export type ViewerThemeQuery$ref = typeof _ViewerThemeQuery$ref;
export type ViewerThemeQuery = {
    readonly viewer: ({
        readonly themeName: string;
    }) | null;
    readonly " $refType": ViewerThemeQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewerThemeQuery",
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
(node as any).hash = '5efc1d93529f08ba65568a002a5496ac';
export default node;
