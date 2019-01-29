/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { LayoutQuery$ref } from "./LayoutQuery.graphql";
import { SetUserThemeQuery$ref } from "./SetUserThemeQuery.graphql";
declare const _meQuery$ref: unique symbol;
export type meQuery$ref = typeof _meQuery$ref;
export type meQuery = {
    readonly requiredViewer: {
        readonly email: string;
    };
    readonly " $fragmentRefs": LayoutQuery$ref & SetUserThemeQuery$ref;
    readonly " $refType": meQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "meQuery",
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
      "kind": "FragmentSpread",
      "name": "SetUserThemeQuery",
      "args": null
    },
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
    }
  ]
};
(node as any).hash = '895732c8f441e13eb0b43e8f835bd0ba';
export default node;
