/**
 * @flow
 * @relayHash dd90af67e91d2b7564aad74e46a78f37
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type editQueryVariables = {|
  domain: string,
|};
export type editQueryResponse = {|
  +web: ?{|
    +name: string,
  |},
|};
*/


/*
query editQuery(
  $domain: String!
) {
  web(domain: $domain) {
    name
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "domain",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "domain",
    "variableName": "domain",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "editQuery",
  "id": null,
  "text": "query editQuery(\n  $domain: String!\n) {\n  web(domain: $domain) {\n    name\n    id\n  }\n}\n",
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
        "name": "web",
        "storageKey": null,
        "args": v1,
        "concreteType": "Web",
        "plural": false,
        "selections": [
          v2
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
        "name": "web",
        "storageKey": null,
        "args": v1,
        "concreteType": "Web",
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
      }
    ]
  }
};
})();
(node/*: any*/).hash = '93da25a514396eb252c01bab272f5920';
module.exports = node;
