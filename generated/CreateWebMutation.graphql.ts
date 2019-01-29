/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED" | "%future added value";
export type CreateWebInput = {
    readonly name: string;
};
export type CreateWebMutationVariables = {
    readonly input: CreateWebInput;
};
export type CreateWebMutationResponse = {
    readonly createWeb: {
        readonly web: ({
            readonly id: string;
        }) | null;
        readonly errors: ({
            readonly name: Max140CharsError | null;
        }) | null;
    };
};
export type CreateWebMutation = {
    readonly response: CreateWebMutationResponse;
    readonly variables: CreateWebMutationVariables;
};



/*
mutation CreateWebMutation(
  $input: CreateWebInput!
) {
  createWeb(input: $input) {
    web {
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
    "type": "CreateWebInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createWeb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateWebInput!"
      }
    ],
    "concreteType": "CreateWebPayload",
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
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "CreateWebErrors",
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
    "name": "CreateWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateWebMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateWebMutation",
    "id": null,
    "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    web {\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '64f32d2b4bb6377920b968ab0058cd46';
export default node;
