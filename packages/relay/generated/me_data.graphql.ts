/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
import { SetUserTheme_data$ref } from "./SetUserTheme_data.graphql";
declare const _me_data$ref: unique symbol;
export type me_data$ref = typeof _me_data$ref;
export type me_data = {
    readonly requiredViewer: {
        readonly email: string;
    };
    readonly " $fragmentRefs": Layout_data$ref & SetUserTheme_data$ref;
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
      "name": "SetUserTheme_data",
      "args": null
    }
  ]
};
(node as any).hash = 'a2089c4d224a46eb90f522e10d0cd4a0';
export default node;
