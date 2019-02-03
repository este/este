/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type DeleteWebInput = {
    readonly id: string;
};
export type DeleteWebMutationVariables = {
    readonly input: DeleteWebInput;
};
export type DeleteWebMutationResponse = {
    readonly deleteWeb: {
        readonly web: ({
            readonly id: string;
        }) | null;
    };
};
export type DeleteWebMutation = {
    readonly response: DeleteWebMutationResponse;
    readonly variables: DeleteWebMutationVariables;
};



/*
mutation DeleteWebMutation(
  $input: DeleteWebInput!
) {
  deleteWeb(input: $input) {
    web {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeleteWebInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteWeb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "DeleteWebInput!"
      }
    ],
    "concreteType": "DeleteWebPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "web",
        "storageKey": null,
        "args": null,
        "concreteType": "Web",
        "plural": false,
        "selections": [
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
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "DeleteWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteWebMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteWebMutation",
    "id": null,
    "text": "mutation DeleteWebMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    web {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'bc857af0266cf71d7ed7fce0e84c9c27';
export default node;
