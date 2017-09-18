/**
 * @flow
 * @relayHash 297d3feae70f5cc90df8e009238d3a8a
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteWebMutationVariables = {|
  input: {
    id: string;
    clientMutationId: string;
  };
|};

export type DeleteWebMutationResponse = {|
  +deleteWeb: ?{|
    +deletedId: ?string;
  |};
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

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteWebInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteWebMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteWebInput!"
          }
        ],
        "concreteType": "DeleteWebPayload",
        "name": "deleteWeb",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DeleteWebMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteWebInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteWebMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteWebInput!"
          }
        ],
        "concreteType": "DeleteWebPayload",
        "name": "deleteWeb",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "deletedId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteWebMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    deletedId\n  }\n}\n"
};

module.exports = batch;
