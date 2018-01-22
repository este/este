/**
 * @flow
 * @relayHash f0f9a79439e63e9c4880b01359595599
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteWebMutationVariables = {|
  input: {
    id: string,
    clientMutationId: string,
  },
|};
export type DeleteWebMutationResponse = {|
  +deleteWeb: ?{|
    +deletedId: ?string,
  |},
|};
*/


/*
mutation DeleteWebMutation(
  $input: DeleteWebInput!
) {
  deleteWeb(input: $input) {
    deletedId
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
        "kind": "ScalarField",
        "alias": null,
        "name": "deletedId",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "DeleteWebMutation",
  "id": null,
  "text": "mutation DeleteWebMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    deletedId\n  }\n}\n",
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
(node/*: any*/).hash = 'bbad62e9ed566ffdea0d808e57d34c0e';
module.exports = node;
