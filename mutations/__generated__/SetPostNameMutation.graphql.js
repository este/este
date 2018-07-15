/**
 * @flow
 * @relayHash 1ac4b010923576331a192f894ff7c6b1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED";
export type SetPostNameInput = {
  id: string,
  name: string,
};
export type SetPostNameMutationVariables = {|
  input: SetPostNameInput
|};
export type SetPostNameMutationResponse = {|
  +setPostName: ?{|
    +post: ?{|
      +name: ?string
    |},
    +errors: ?{|
      +name: ?Max140CharsError
    |},
  |}
|};
*/


/*
mutation SetPostNameMutation(
  $input: SetPostNameInput!
) {
  setPostName(input: $input) {
    post {
      name
      id
    }
    errors {
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetPostNameInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetPostNameInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  v2
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "errors",
  "storageKey": null,
  "args": null,
  "concreteType": "SetPostNameErrors",
  "plural": false,
  "selections": v3
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SetPostNameMutation",
  "id": null,
  "text": "mutation SetPostNameMutation(\n  $input: SetPostNameInput!\n) {\n  setPostName(input: $input) {\n    post {\n      name\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPostNameMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPostName",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPostNamePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "post",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": false,
            "selections": v3
          },
          v4
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "SetPostNameMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPostName",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPostNamePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "post",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v4
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '90d29d704c9169c444761e60680cf771';
module.exports = node;
