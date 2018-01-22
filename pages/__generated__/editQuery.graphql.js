/**
 * @flow
 * @relayHash 62de23f0c447c58a683cc4d6a2310d5d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type editQueryVariables = {|
  domain?: ?string,
|};
export type editQueryResponse = {|
  +viewer: {|
    +Web: ?{|
      +name: string,
    |},
  |},
|};
*/


/*
query editQuery(
  $domain: String
) {
  viewer {
    Web(domain: $domain) {
      name
      id
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "domain",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "domain",
    "variableName": "domain",
    "type": "String"
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
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "editQuery",
  "id": null,
  "text": "query editQuery(\n  $domain: String\n) {\n  viewer {\n    Web(domain: $domain) {\n      name\n      id\n    }\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "editQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "Web",
            "storageKey": null,
            "args": v1,
            "concreteType": "Web",
            "plural": false,
            "selections": [
              v2
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "editQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "Web",
            "storageKey": null,
            "args": v1,
            "concreteType": "Web",
            "plural": false,
            "selections": [
              v2,
              v3
            ]
          },
          v3
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '6a57316321760796bfb73d8095610538';
module.exports = node;
