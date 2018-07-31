/**
 * @flow
 * @relayHash 82dedd2c3505f7f0a6d929485e63d393
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED";
export type CreateWebInput = {
  name: string,
  postName: string,
};
export type CreateWebMutationVariables = {|
  input: CreateWebInput
|};
export type CreateWebMutationResponse = {|
  +createWeb: ?{|
    +postId: ?string,
    +errors: ?{|
      +name: ?Max140CharsError,
      +postName: ?Max140CharsError,
    |},
  |}
|};
*/


/*
mutation CreateWebMutation(
  $input: CreateWebInput!
) {
  createWeb(input: $input) {
    postId
    errors {
      name
      postName
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
        "kind": "ScalarField",
        "alias": null,
        "name": "postId",
        "args": null,
        "storageKey": null
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "postName",
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
  "name": "CreateWebMutation",
  "id": null,
  "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    postId\n    errors {\n      name\n      postName\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateWebMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd4048444e587e5616b1e3e3d06ac9888';
module.exports = node;
