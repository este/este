/**
 * @flow
 * @relayHash fe38e462944b6ff6ad11f3c5488170e2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DeleteWebInput = {
  id: string
};
export type WebsItemDeleteMutationVariables = {|
  input: DeleteWebInput
|};
export type WebsItemDeleteMutationResponse = {|
  +deleteWeb: ?{|
    +id: ?string
  |}
|};
*/


/*
mutation WebsItemDeleteMutation(
  $input: DeleteWebInput!
) {
  deleteWeb(input: $input) {
    id
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
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "WebsItemDeleteMutation",
  "id": null,
  "text": "mutation WebsItemDeleteMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "WebsItemDeleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "WebsItemDeleteMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '54a0af1ba663899cd9ff2964f7f7dd84';
module.exports = node;
