/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED" | "%future added value";
export type TadaUpdateInput = {
    readonly description?: string | null;
    readonly id: string;
    readonly name?: string | null;
};
export type tadaMutationVariables = {
    readonly input: TadaUpdateInput;
};
export type tadaMutationResponse = {
    readonly updateTada: {
        readonly errors: {
            readonly name: Max140CharsError | null;
        } | null;
        readonly tada: {
            readonly id: string;
            readonly name: string;
        } | null;
    };
};
export type tadaMutation = {
    readonly response: tadaMutationResponse;
    readonly variables: tadaMutationVariables;
};



/*
mutation tadaMutation(
  $input: TadaUpdateInput!
) {
  updateTada(input: $input) {
    errors {
      name
    }
    tada {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "TadaUpdateInput!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "updateTada",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TadaUpdatePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "TadaUpdateErrors",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ]
      },
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
          },
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "tadaMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "tadaMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "tadaMutation",
    "id": null,
    "text": "mutation tadaMutation(\n  $input: TadaUpdateInput!\n) {\n  updateTada(input: $input) {\n    errors {\n      name\n    }\n    tada {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '306912133e5df126a1204194c5419b4a';
export default node;
