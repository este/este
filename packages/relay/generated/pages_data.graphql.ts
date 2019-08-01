/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Layout_data$ref } from "./Layout_data.graphql";
import { UserTadas_user$ref } from "./UserTadas_user.graphql";
import { UserTeamates_user$ref } from "./UserTeamates_user.graphql";
declare const _pages_data$ref: unique symbol;
export type pages_data$ref = typeof _pages_data$ref;
export type pages_data = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": UserTadas_user$ref & UserTeamates_user$ref;
    } | null;
    readonly " $fragmentRefs": Layout_data$ref;
    readonly " $refType": pages_data$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "pages_data",
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
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "UserTadas_user",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 5
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "UserTeamates_user",
          "args": [
            {
              "kind": "Literal",
              "name": "tadasFirst",
              "value": 3
            }
          ]
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
(node as any).hash = '726a2a8931d4def97b425c9f177f8dff';
export default node;
