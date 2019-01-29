/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { LayoutQuery$ref } from "./LayoutQuery.graphql";
declare const _webQuery$ref: unique symbol;
export type webQuery$ref = typeof _webQuery$ref;
export type webQuery = {
    readonly web: {
        readonly name: string;
        readonly id: string;
    };
    readonly " $fragmentRefs": LayoutQuery$ref;
    readonly " $refType": webQuery$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "webQuery",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "id",
      "type": "ID!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "LayoutQuery",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "web",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
      "concreteType": "Web",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '7cef18cc8873b9c394ee68bb9832863c';
export default node;
