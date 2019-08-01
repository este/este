/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED" | "%future added value";
export type TadaCreateInput = {
    readonly description?: string | null;
    readonly name: string;
};
export type CreateTadaMutationVariables = {
    readonly input: TadaCreateInput;
};
export type CreateTadaMutationResponse = {
    readonly createTada: {
        readonly tada: {
            readonly id: string;
        } | null;
        readonly errors: {
            readonly name: Max140CharsError | null;
        } | null;
    };
};
export type CreateTadaMutation = {
    readonly response: CreateTadaMutationResponse;
    readonly variables: CreateTadaMutationVariables;
};



/*
mutation CreateTadaMutation(
  $input: TadaCreateInput!
) {
  createTada(input: $input) {
    tada {
      id
    }
    errors {
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
    "type": "TadaCreateInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createTada",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TadaCreatePayload",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "TadaCreateErrors",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
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
    "name": "CreateTadaMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateTadaMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateTadaMutation",
    "id": null,
    "text": "mutation CreateTadaMutation(\n  $input: TadaCreateInput!\n) {\n  createTada(input: $input) {\n    tada {\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '095bcc6ddf2756325946f7b6519b6e6d';
export default node;
