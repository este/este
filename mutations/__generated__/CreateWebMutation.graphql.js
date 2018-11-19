/**
 * @flow
 * @relayHash f19f0490166c5352e6af38c23385c816
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Min5Max140CharsError = "MAX_140_CHARS" | "MIN_5_CHARS" | "REQUIRED";
export type CreateWebInput = {
  name: string,
  pageTitle: string,
};
export type CreateWebMutationVariables = {|
  input: CreateWebInput
|};
export type CreateWebMutationResponse = {|
  +createWeb: ?{|
    +pageId: ?string,
    +errors: ?{|
      +name: ?Min5Max140CharsError,
      +pageTitle: ?Min5Max140CharsError,
    |},
  |}
|};
export type CreateWebMutation = {|
  variables: CreateWebMutationVariables,
  response: CreateWebMutationResponse,
|};
*/


/*
mutation CreateWebMutation(
  $input: CreateWebInput!
) {
  createWeb(input: $input) {
    pageId
    errors {
      name
      pageTitle
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateWebInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createWeb",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateWebInput!"
      }
    ],
    "concreteType": "CreateWebPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "pageId",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "errors",
        "storageKey": null,
        "args": null,
        "concreteType": "CreateWebErrors",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "pageTitle",
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
  "name": "CreateWebMutation",
  "id": null,
  "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    pageId\n    errors {\n      name\n      pageTitle\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateWebMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8549878ca48c75dd14f0da3a6c332350';
module.exports = node;
