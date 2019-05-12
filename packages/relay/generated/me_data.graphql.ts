/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
import { SetUserThemeQuery$ref } from "./SetUserThemeQuery.graphql";
declare const _me_data$ref: unique symbol;
export type me_data$ref = typeof _me_data$ref;
export type me_data = {
    readonly requiredViewer: {
        readonly email: string;
    };
    readonly " $fragmentRefs": Layout_data$ref & SetUserThemeQuery$ref;
    readonly " $refType": me_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "me_data",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "requiredViewer",
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
    },
    {
      "kind": "FragmentSpread",
      "name": "Layout_data",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SetUserThemeQuery",
      "args": null
    }
  ]
};
(node as any).hash = 'df3e1d0014ff9aa4df471edea4fcf95f';
export default node;
