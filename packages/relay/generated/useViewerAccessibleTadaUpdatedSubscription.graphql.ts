/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type useViewerAccessibleTadaUpdatedSubscriptionVariables = {};
export type useViewerAccessibleTadaUpdatedSubscriptionResponse = {
    readonly viewerAccessibleTadaUpdated: {
        readonly node: {
            readonly id: string;
            readonly name: string;
            readonly createdAt: any;
        } | null;
    };
};
export type useViewerAccessibleTadaUpdatedSubscription = {
    readonly response: useViewerAccessibleTadaUpdatedSubscriptionResponse;
    readonly variables: useViewerAccessibleTadaUpdatedSubscriptionVariables;
};



/*
subscription useViewerAccessibleTadaUpdatedSubscription {
  viewerAccessibleTadaUpdated {
    node {
      id
      name
      createdAt
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "viewerAccessibleTadaUpdated",
    "storageKey": null,
    "args": null,
    "concreteType": "TadaSubscriptionPayload",
    "plural": false,
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
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "useViewerAccessibleTadaUpdatedSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "useViewerAccessibleTadaUpdatedSubscription",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "useViewerAccessibleTadaUpdatedSubscription",
    "id": null,
    "text": "subscription useViewerAccessibleTadaUpdatedSubscription {\n  viewerAccessibleTadaUpdated {\n    node {\n      id\n      name\n      createdAt\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e44d8aca9349f1be95558f216e97874e';
export default node;
