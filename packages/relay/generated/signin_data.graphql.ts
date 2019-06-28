/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
declare const _signin_data$ref: unique symbol;
export type signin_data$ref = typeof _signin_data$ref;
export type signin_data = {
    readonly " $fragmentRefs": Layout_data$ref;
    readonly " $refType": signin_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "signin_data",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Layout_data",
      "args": null
    }
  ]
};
(node as any).hash = 'd6dcba44919ce4ae1a1f7a8813a8e110';
export default node;
