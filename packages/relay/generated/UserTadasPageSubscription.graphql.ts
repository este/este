/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type PageSubcriptionFilters = {
    readonly first: number;
    readonly rootDataId: string;
    readonly skip: number;
};
export type UserTadasPageSubscriptionVariables = {
    readonly filters: PageSubcriptionFilters;
};
export type UserTadasPageSubscriptionResponse = {
    readonly userTadasConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly createdAt: any;
            };
        }>;
    };
};
export type UserTadasPageSubscription = {
    readonly response: UserTadasPageSubscriptionResponse;
    readonly variables: UserTadasPageSubscriptionVariables;
};



/*
subscription UserTadasPageSubscription(
  $filters: PageSubcriptionFilters!
) {
  userTadasConnection(filters: $filters) {
    edges {
      node {
        id
        name
        createdAt
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filters",
    "type": "PageSubcriptionFilters!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "userTadasConnection",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "filters",
        "variableName": "filters"
      }
    ],
    "concreteType": "TadaConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "TadaEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "Tada",
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
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "createdAt",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "UserTadasPageSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UserTadasPageSubscription",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "UserTadasPageSubscription",
    "id": null,
    "text": "subscription UserTadasPageSubscription(\n  $filters: PageSubcriptionFilters!\n) {\n  userTadasConnection(filters: $filters) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '999fda2b9b756b803dc25ac65ef88a20';
export default node;
