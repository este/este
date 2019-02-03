/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { LayoutQuery$ref } from "./LayoutQuery.graphql";
declare const _signinQuery$ref: unique symbol;
export type signinQuery$ref = typeof _signinQuery$ref;
export type signinQuery = {
    readonly " $fragmentRefs": LayoutQuery$ref;
    readonly " $refType": signinQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "signinQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "LayoutQuery",
      "args": null
    }
  ]
};
(node as any).hash = '36a88a18e4472da3362d75a6e7eeca80';
export default node;
