/**
 * @flow
 * @relayHash 8092bf844fa232ad86701e90a596f683
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPostTextInput = {
  id: string,
  text: string,
};
export type PostTextMutationVariables = {|
  input: SetPostTextInput
|};
export type PostTextMutationResponse = {|
  +setPostText: ?{|
    +post: ?{|
      +id: string,
      +text: ?string,
    |}
  |}
|};
*/


/*
mutation PostTextMutation(
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
  "name": "PostTextMutation",
  "id": null,
  "text": "mutation PostTextMutation(\n  $input: SetPostTextInput!\n) {\n  setPostText(input: $input) {\n    post {\n      id\n      text\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PostTextMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "PostTextMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a8a387e6c55917099e695040e60959c9';
module.exports = node;
