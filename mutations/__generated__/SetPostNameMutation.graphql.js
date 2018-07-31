/**
 * @flow
 * @relayHash eaf1a13d29696a045b18ecacd00ebfe3
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
    +errors: ?{|
      +name: ?Max140CharsError
    |}
  |}
|};
export type SetPostNameMutation = {|
  variables: SetPostNameMutationVariables,
  response: SetPostNameMutationResponse,
|};
*/


/*
mutation SetPostNameMutation(
  $input: SetPostNameInput!
) {
  setPostName(input: $input) {
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
    "kind": "LinkedField",
    "alias": null,
    "name": "setPostName",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPostNameInput!"
      }
    ],
    "concreteType": "SetPostNamePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "SetPostNameErrors",
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
  "operationKind": "mutation",
  "name": "SetPostNameMutation",
  "id": null,
  "text": "mutation SetPostNameMutation(\n  $input: SetPostNameInput!\n) {\n  setPostName(input: $input) {\n    errors {\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPostNameMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SetPostNameMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '69c12ea86fffc63f0ab8b4afa6ed1177';
module.exports = node;
