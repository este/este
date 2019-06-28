/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
declare const _web_data$ref: unique symbol;
export type web_data$ref = typeof _web_data$ref;
export type web_data = {
    readonly web: {
        readonly name: string;
        readonly id: string;
    };
    readonly " $fragmentRefs": Layout_data$ref;
    readonly " $refType": web_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "web_data",
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
      "name": "web",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
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
    },
    {
      "kind": "FragmentSpread",
      "name": "Layout_data",
      "args": null
    }
  ]
};
(node as any).hash = 'e7709d84184701e18e6d663976e5dbd7';
export default node;
