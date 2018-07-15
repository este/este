/**
 * @flow
 * @relayHash 95bba7164918c55b26dea54d85876b73
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
      +id: string,
      +text: ?string,
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
      text
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "text",
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
  "text": "mutation SetPostTextMutation(\n  $input: SetPostTextInput!\n) {\n  setPostText(input: $input) {\n    post {\n      id\n      text\n    }\n  }\n}\n",
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
(node/*: any*/).hash = 'acbe79f50139e77fc710570f67b5be10';
module.exports = node;
