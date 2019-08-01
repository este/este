/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { UserTadas_user$ref } from "./UserTadas_user.graphql";
declare const _UserTeamates_user$ref: unique symbol;
export type UserTeamates_user$ref = typeof _UserTeamates_user$ref;
export type UserTeamates_user = {
    readonly id: string;
    readonly teamates: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly email: string;
                readonly createdAt: any;
                readonly " $fragmentRefs": UserTadas_user$ref;
            };
        }>;
    };
    readonly " $refType": UserTeamates_user$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "UserTeamates_user",
  "type": "User",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": null,
        "direction": "forward",
        "path": [
          "teamates"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int!",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "tadasFirst",
      "type": "Int",
      "defaultValue": null
    }
  ],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "LinkedField",
      "alias": "teamates",
      "name": "__UserTeamatesFragment_teamates_connection",
      "storageKey": null,
      "args": null,
      "concreteType": "UserConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "UserEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "User",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "email",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "createdAt",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "UserTadas_user",
                  "args": [
                    {
                      "kind": "Variable",
                      "name": "first",
                      "variableName": "tadasFirst"
                    }
                  ]
                }
              ]
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "cursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'a3c39c37f5b8ef5155f874a8ac0a7c7a';
export default node;
