/**
 * @flow
 * @relayHash e65faea0d1cca859cc54779b28c7e340
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type WebListItem_web$ref = any;
export type CreateWebMutationVariables = {|
  input: {
    domain: string,
    name: string,
    ownerId?: ?string,
    owner?: ?{
      email?: ?string,
      password?: ?string,
      websIds?: ?$ReadOnlyArray<string>,
      webs?: ?$ReadOnlyArray<{
        domain: string,
        name: string,
      }>,
    },
    clientMutationId: string,
  },
|};
export type CreateWebMutationResponse = {|
  +createWeb: ?{|
    +edge: ?{|
      +node: {|
        +$fragmentRefs: WebListItem_web$ref,
      |},
    |},
  |},
|};
*/


/*
mutation CreateWebMutation(
  $input: CreateWebInput!
) {
  createWeb(input: $input) {
    edge {
      node {
        ...WebListItem_web
        id
      }
    }
  }
}

fragment WebListItem_web on Web {
  updatedAt
  domain
  owner {
    id
  }
  id
  name
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
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateWebMutation",
  "id": null,
  "text": "mutation CreateWebMutation(\n  $input: CreateWebInput!\n) {\n  createWeb(input: $input) {\n    edge {\n      node {\n        ...WebListItem_web\n        id\n      }\n    }\n  }\n}\n\nfragment WebListItem_web on Web {\n  updatedAt\n  domain\n  owner {\n    id\n  }\n  id\n  name\n}\n",
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
                    "name": "WebListItem_web",
                    "args": null
                  }
                ]
              }
            ]
          }
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "domain",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "owner",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "User",
                    "plural": false,
                    "selections": [
                      v2
                    ]
                  },
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '9e91e7c5b96e6d9a50e526500da3da7d';
module.exports = node;
