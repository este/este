/**
 * @flow
 * @relayHash 3227b89a56420152a5d2c57ed5371c83
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPostTextInput = {
  id: string,
  text: string,
};
export type SetPostTextMutationVariables = {|
  input: SetPostTextInput
|};
export type SetPostTextMutationResponse = {|
  +setPostText: ?{|
    +post: ?{|
      +id: string
    |}
  |}
|};
*/


/*
mutation SetPostTextMutation(
  $input: SetPostTextInput!
) {
  setPostText(input: $input) {
    post {
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
    "type": "SetPostTextInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setPostText",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPostTextInput!"
      }
    ],
    "concreteType": "SetPostTextPayload",
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
  "name": "SetPostTextMutation",
  "id": null,
  "text": "mutation SetPostTextMutation(\n  $input: SetPostTextInput!\n) {\n  setPostText(input: $input) {\n    post {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPostTextMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "SetPostTextMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ce66d761f1497cb3c0c8bfe2ab61d7e2';
module.exports = node;
