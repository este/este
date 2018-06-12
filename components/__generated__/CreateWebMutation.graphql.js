/**
 * @flow
 * @relayHash c5be9cc53173e5c79afcc430032e6893
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WebsItem$ref = any;
export type Max140CharsError = "MAX_140_CHARS" | "NO_TRAILING_SPACES" | "REQUIRED";
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
        +domain: string,
        +$fragmentRefs: WebsItem$ref,
      |}
    |},
    +errors: ?{|
      +name: ?Max140CharsError
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
        domain
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
  "name": "domain",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "errors",
  "storageKey": null,
  "args": null,
  "concreteType": "CreateWebErrors",
  "plural": false,
  "selections": [
    v3
  ]
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateWebMutation",
  "id": null,
  "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    edge {\n      node {\n        domain\n        ...WebsItem\n        id\n      }\n    }\n    errors {\n      name\n    }\n  }\n}\n\nfragment WebsItem on Web {\n  updatedAt\n  name\n  domain\n  id\n}\n",
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
                  v2,
                  {
                    "kind": "FragmentSpread",
                    "name": "WebsItem",
                    "args": null
                  }
                ]
              }
            ]
          },
          v4
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
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "updatedAt",
                    "args": null,
                    "storageKey": null
                  },
                  v3,
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
          v4
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b9207999bf28264029af2034543a521c';
module.exports = node;
