/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type EmailError = "ALREADY_EXISTS" | "EMAIL" | "NOT_EXISTS" | "REQUIRED" | "%future added value";
export type PasswordError = "MAX_1024_CHARS" | "MIN_5_CHARS" | "REQUIRED" | "WRONG_PASSWORD" | "%future added value";
export type SignInInput = {
    readonly email: string;
    readonly password: string;
    readonly createAccount: boolean;
};
export type signinMutationVariables = {
    readonly input: SignInInput;
};
export type signinMutationResponse = {
    readonly signIn: {
        readonly token: string | null;
        readonly errors: ({
            readonly email: EmailError | null;
            readonly password: PasswordError | null;
        }) | null;
    };
};
export type signinMutation = {
    readonly response: signinMutationResponse;
    readonly variables: signinMutationVariables;
};



/*
mutation signinMutation(
  $input: SignInInput!
) {
  signIn(input: $input) {
    token
    errors {
      email
      password
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SignInInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "signIn",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SignInInput!"
      }
    ],
    "concreteType": "SignInPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "token",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "SignInErrors",
        "plural": false,
        "selections": [
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
            "name": "password",
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
    "name": "signinMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "signinMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "signinMutation",
    "id": null,
    "text": "mutation signinMutation(\n  $input: SignInInput!\n) {\n  signIn(input: $input) {\n    token\n    errors {\n      email\n      password\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c9242d88d01b9210350583f27a76a7a6';
export default node;
