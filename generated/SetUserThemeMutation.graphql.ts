/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SetUserThemeInput = {
    readonly name: string;
};
export type SetUserThemeMutationVariables = {
    readonly input: SetUserThemeInput;
};
export type SetUserThemeMutationResponse = {
    readonly setUserTheme: {
        readonly user: ({
            readonly themeName: string;
        }) | null;
    };
};
export type SetUserThemeMutation = {
    readonly response: SetUserThemeMutationResponse;
    readonly variables: SetUserThemeMutationVariables;
};



/*
mutation SetUserThemeMutation(
  $input: SetUserThemeInput!
) {
  setUserTheme(input: $input) {
    user {
      themeName
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
    "type": "SetUserThemeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetUserThemeInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "themeName",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "SetUserThemeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setUserTheme",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SetUserThemePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SetUserThemeMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setUserTheme",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SetUserThemePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "SetUserThemeMutation",
    "id": null,
    "text": "mutation SetUserThemeMutation(\n  $input: SetUserThemeInput!\n) {\n  setUserTheme(input: $input) {\n    user {\n      themeName\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'db6a3a6b9cdef85a7724fcf5d11b9744';
export default node;
