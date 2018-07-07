/**
 * @flow
 * @relayHash 4e2010d847176f9755b6647ac6451786
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type SetPostContentTextInput = {
  id: string,
  contentText: string,
};
export type PostMarkdownMutationVariables = {|
  input: SetPostContentTextInput
|};
export type PostMarkdownMutationResponse = {|
  +setPostContentText: ?{|
    +post: ?{|
      +id: string,
      +contentText: ?string,
    |}
  |}
|};
*/


/*
mutation PostMarkdownMutation(
  $input: SetPostContentTextInput!
) {
  setPostContentText(input: $input) {
    post {
      id
      contentText
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetPostContentTextInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setPostContentText",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetPostContentTextInput!"
      }
    ],
    "concreteType": "SetPostContentTextPayload",
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
            "name": "contentText",
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
  "name": "PostMarkdownMutation",
  "id": null,
  "text": "mutation PostMarkdownMutation(\n  $input: SetPostContentTextInput!\n) {\n  setPostContentText(input: $input) {\n    post {\n      id\n      contentText\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PostMarkdownMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "PostMarkdownMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '94eda349c2f34415b1240af26e5f735b';
module.exports = node;
