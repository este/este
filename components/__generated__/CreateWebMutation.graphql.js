/**
 * @flow
 * @relayHash b3df4d50eb074d5a16be9edbaf9c2df0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WebsItem$ref = any;
export type max140CharsError = "MAX_140_CHARS" | "NO_TRAILING_SPACES" | "REQUIRED";
export type CreateWebInput = {
  name: string
};
export type CreateWebMutationVariables = {|
  input: CreateWebInput
|};
export type CreateWebMutationResponse = {|
  +createWeb: ?{|
    +edge: ?{|
      +node: {|
        +$fragmentRefs: WebsItem$ref
      |}
    |},
    +errors: ?{|
      +name: ?max140CharsError
    |},
  |}
|};
*/


/*
mutation CreateWebMutation(
  $input: CreateWebInput!
) {
  createWeb(input: $input) {
    edge {
      node {
        ...WebsItem
        id
      }
    }
    errors {
      name
    }
  }
}

fragment WebsItem on Web {
  updatedAt
  name
  domain
  id
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateWebInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "errors",
  "storageKey": null,
  "args": null,
  "concreteType": "CreateWebErrors",
  "plural": false,
  "selections": [
    v2
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateWebMutation",
  "id": null,
  "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    edge {\n      node {\n        ...WebsItem\n        id\n      }\n    }\n    errors {\n      name\n    }\n  }\n}\n\nfragment WebsItem on Web {\n  updatedAt\n  name\n  domain\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateWebMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createWeb",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateWebPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edge",
            "storageKey": null,
            "args": null,
            "concreteType": "WebEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": false,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "WebsItem",
                    "args": null
                  }
                ]
              }
            ]
          },
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateWebMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createWeb",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateWebPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edge",
            "storageKey": null,
            "args": null,
            "concreteType": "WebEdge",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "node",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "updatedAt",
                    "args": null,
                    "storageKey": null
                  },
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "domain",
                    "args": null,
                    "storageKey": null
                  },
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
          },
          v3
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '18da0cb28544895732b00b2e119458e8';
module.exports = node;
