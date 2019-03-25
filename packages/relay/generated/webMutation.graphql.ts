/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED" | "%future added value";
export type UpdateWebInput = {
    readonly id: string;
    readonly name: string;
};
export type webMutationVariables = {
    readonly input: UpdateWebInput;
};
export type webMutationResponse = {
    readonly updateWeb: {
        readonly errors: ({
            readonly name: Max140CharsError | null;
        }) | null;
        readonly web: ({
            readonly id: string;
            readonly name: string;
        }) | null;
    };
};
export type webMutation = {
    readonly response: webMutationResponse;
    readonly variables: webMutationVariables;
};



/*
mutation webMutation(
  $input: UpdateWebInput!
) {
  updateWeb(input: $input) {
    errors {
      name
    }
    web {
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
    "type": "UpdateWebInput!",
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
    "name": "updateWeb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "UpdateWebInput!"
      }
    ],
    "concreteType": "UpdateWebPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "UpdateWebErrors",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ]
      },
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
    "name": "webMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "webMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "webMutation",
    "id": null,
    "text": "mutation webMutation(\n  $input: UpdateWebInput!\n) {\n  updateWeb(input: $input) {\n    errors {\n      name\n    }\n    web {\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '82d1163391711c566819fe72b7823f7c';
export default node;
