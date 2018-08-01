/**
 * @flow
 * @relayHash dffb4c5f024116e2117236ab780500c7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteWebInput = {
  id: string
};
export type DeleteWebMutationVariables = {|
  input: DeleteWebInput
|};
export type DeleteWebMutationResponse = {|
  +deleteWeb: ?{|
    +web: ?{|
      +id: string
    |}
  |}
|};
export type DeleteWebMutation = {|
  variables: DeleteWebMutationVariables,
  response: DeleteWebMutationResponse,
|};
*/


/*
mutation DeleteWebMutation(
  $input: DeleteWebInput!
) {
  deleteWeb(input: $input) {
    web {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "DeleteWebInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "deleteWeb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "DeleteWebInput!"
      }
    ],
    "concreteType": "DeleteWebPayload",
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "DeleteWebMutation",
  "id": null,
  "text": "mutation DeleteWebMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    web {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "DeleteWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "DeleteWebMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc857af0266cf71d7ed7fce0e84c9c27';
module.exports = node;
