/**
 * @flow
 * @relayHash 1b6770db094e7ecb56d81d0fb71375d9
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeletePostMutationVariables = {|
  input: {
    id: string;
    clientMutationId: string;
  };
|};

export type DeletePostMutationResponse = {|
  +deletePost: ?{|
    +deletedId: ?string;
  |};
|};
*/


/*
mutation DeletePostMutation(
  $input: DeletePostInput!
) {
  deletePost(input: $input) {
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
        "type": "DeletePostInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeletePostMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeletePostInput!"
          }
        ],
        "concreteType": "DeletePostPayload",
        "name": "deletePost",
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
  "name": "DeletePostMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeletePostInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeletePostMutation",
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
            "type": "DeletePostInput!"
          }
        ],
        "concreteType": "DeletePostPayload",
        "name": "deletePost",
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
  "text": "mutation DeletePostMutation(\n  $input: DeletePostInput!\n) {\n  deletePost(input: $input) {\n    deletedId\n  }\n}\n"
};

module.exports = batch;
