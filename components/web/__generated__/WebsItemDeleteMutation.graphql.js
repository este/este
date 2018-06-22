/**
 * @flow
 * @relayHash 4f5d02a21bee1866da6231860151c65d
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
    +web: ?{|
      +id: string
    |}
  |}
|};
*/


/*
mutation WebsItemDeleteMutation(
  $input: DeleteWebInput!
) {
  deleteWeb(input: $input) {
    web {
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
        "kind": "LinkedField",
        "alias": null,
        "name": "web",
        "storageKey": null,
        "args": null,
        "concreteType": "Web",
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
  "name": "WebsItemDeleteMutation",
  "id": null,
  "text": "mutation WebsItemDeleteMutation(\n  $input: DeleteWebInput!\n) {\n  deleteWeb(input: $input) {\n    web {\n      id\n    }\n  }\n}\n",
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
(node/*: any*/).hash = '67415f8d3917647632634e6f046ca989';
module.exports = node;
