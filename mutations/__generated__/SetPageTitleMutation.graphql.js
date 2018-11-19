/**
 * @flow
 * @relayHash fea34eed8f69311612991fedeff95876
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type Min5Max140CharsError = "MAX_140_CHARS" | "MIN_5_CHARS" | "REQUIRED";
export type SetPageTitleInput = {
  id: string,
  title: string,
};
export type SetPageTitleMutationVariables = {|
  input: SetPageTitleInput
|};
export type SetPageTitleMutationResponse = {|
  +setPageTitle: ?{|
    +page: ?{|
      +title: string
    |},
    +errors: ?{|
      +title: ?Min5Max140CharsError
    |},
  |}
|};
export type SetPageTitleMutation = {|
  variables: SetPageTitleMutationVariables,
  response: SetPageTitleMutationResponse,
|};
*/


/*
mutation SetPageTitleMutation(
  $input: SetPageTitleInput!
) {
  setPageTitle(input: $input) {
    page {
      title
      id
    }
    errors {
      title
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetPageTitleInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetPageTitleInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
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
  "concreteType": "SetPageTitleErrors",
  "plural": false,
  "selections": v3
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "SetPageTitleMutation",
  "id": null,
  "text": "mutation SetPageTitleMutation(\n  $input: SetPageTitleInput!\n) {\n  setPageTitle(input: $input) {\n    page {\n      title\n      id\n    }\n    errors {\n      title\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "SetPageTitleMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPageTitle",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPageTitlePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "page",
            "storageKey": null,
            "args": null,
            "concreteType": "Page",
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
    "name": "SetPageTitleMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "setPageTitle",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetPageTitlePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "page",
            "storageKey": null,
            "args": null,
            "concreteType": "Page",
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
(node/*: any*/).hash = 'fa30d08bc3fadab3f72be82a17661cb4';
module.exports = node;
