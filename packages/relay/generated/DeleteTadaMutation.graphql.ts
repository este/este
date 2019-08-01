/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type TadaDeleteInput = {
    readonly id: string;
};
export type DeleteTadaMutationVariables = {
    readonly input: TadaDeleteInput;
};
export type DeleteTadaMutationResponse = {
    readonly deleteTada: {
        readonly tada: {
            readonly id: string;
        } | null;
    };
};
export type DeleteTadaMutation = {
    readonly response: DeleteTadaMutationResponse;
    readonly variables: DeleteTadaMutationVariables;
};



/*
mutation DeleteTadaMutation(
  $input: TadaDeleteInput!
) {
  deleteTada(input: $input) {
    tada {
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
    "type": "TadaDeleteInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteTada",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TadaDeletePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "tada",
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
    "name": "DeleteTadaMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteTadaMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "DeleteTadaMutation",
    "id": null,
    "text": "mutation DeleteTadaMutation(\n  $input: TadaDeleteInput!\n) {\n  deleteTada(input: $input) {\n    tada {\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '82962ec11e17af430237bc3c23cdd977';
export default node;
