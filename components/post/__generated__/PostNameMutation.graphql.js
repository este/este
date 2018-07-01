/**
 * @flow
 * @relayHash 0b706934093d9c576684aeb2b58d3eb9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Max140CharsError = "MAX_140_CHARS" | "REQUIRED";
export type SetPostNameInput = {
  id: string,
  name: string,
};
export type PostNameMutationVariables = {|
  input: SetPostNameInput
|};
export type PostNameMutationResponse = {|
  +setPostName: ?{|
    +post: ?{|
      +name: ?string
    |},
    +errors: ?{|
      +name: ?Max140CharsError
    |},
  |}
|};
*/


/*
mutation PostNameMutation(
  $input: SetPostNameInput!
) {
  setPostName(input: $input) {
    post {
      name
      id
    }
    errors {
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetPostNameInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetPostNameInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  v2
],
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "errors",
  "storageKey": null,
  "args": null,
  "concreteType": "SetPostNameErrors",
  "plural": false,
  "selections": v3
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "PostNameMutation",
  "id": null,
  "text": "mutation PostNameMutation(\n  $input: SetPostNameInput!\n) {\n  setPostName(input: $input) {\n    post {\n      name\n      id\n    }\n    errors {\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PostNameMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPostName",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPostNamePayload",
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
            "selections": v3
          },
          v4
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PostNameMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPostName",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPostNamePayload",
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
              v2,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v4
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24f097be16e5ee64ae235bc94c102f27';
module.exports = node;
