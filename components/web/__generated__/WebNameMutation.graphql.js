/**
 * @flow
 * @relayHash 57e1bfdd05e9d24f73fda02815403362
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
export type WebNameMutationVariables = {|
  input: SetWebNameInput
|};
export type WebNameMutationResponse = {|
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
mutation WebNameMutation(
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
  "name": "WebNameMutation",
  "id": null,
  "text": "mutation WebNameMutation(\n  $input: SetWebNameInput!\n) {\n  setWebName(input: $input) {\n    web {\n      name\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "WebNameMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v2
  },
  "operation": {
    "kind": "Operation",
    "name": "WebNameMutation",
    "argumentDefinitions": v0,
    "selections": v2
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bcda8ddc14fc5731c116675d438b9529';
module.exports = node;
