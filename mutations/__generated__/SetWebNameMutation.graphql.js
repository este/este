/**
 * @flow
 * @relayHash e38e0869d0ca7c4a12790c745c5305aa
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED";
export type SetWebNameInput = {
  id: string,
  name: string,
};
export type SetWebNameMutationVariables = {|
  input: SetWebNameInput
|};
export type SetWebNameMutationResponse = {|
  +setWebName: ?{|
    +web: ?{|
      +name: string,
      +id: string,
    |},
    +errors: ?{|
      +name: ?Max140CharsError
    |},
  |}
|};
*/


/*
mutation SetWebNameMutation(
  $input: SetWebNameInput!
) {
  setWebName(input: $input) {
    web {
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
    "type": "SetWebNameInput!",
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
    "name": "setWebName",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetWebNameInput!"
      }
    ],
    "concreteType": "SetWebNamePayload",
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
          v1,
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
        "concreteType": "SetWebNameErrors",
        "plural": false,
        "selections": [
          v1
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SetWebNameMutation",
  "id": null,
  "text": "mutation SetWebNameMutation(\n  $input: SetWebNameInput!\n) {\n  setWebName(input: $input) {\n    web {\n      name\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetWebNameMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "SetWebNameMutation",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f5677fc93b44deff9ddf96ab9f06f7be';
module.exports = node;
