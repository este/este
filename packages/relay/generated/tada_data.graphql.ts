/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
declare const _tada_data$ref: unique symbol;
export type tada_data$ref = typeof _tada_data$ref;
export type tada_data = {
    readonly tada: {
        readonly name: string;
        readonly id: string;
    } | null;
    readonly " $fragmentRefs": Layout_data$ref;
    readonly " $refType": tada_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "tada_data",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "tada",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "Tada",
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
    },
    {
      "kind": "FragmentSpread",
      "name": "Layout_data",
      "args": null
    }
  ]
};
(node as any).hash = '3e3e3cc83d0893434cae5d340547dfd9';
export default node;
