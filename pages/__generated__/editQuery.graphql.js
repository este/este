/**
 * @flow
 * @relayHash df976d841e2adaec10f8d7953eef0400
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Page$ref = any;
export type editQueryVariables = {|
  domain: string
|};
export type editQueryResponse = {|
  +web: ?{|
    +name: string
  |},
  +$fragmentRefs: Page$ref,
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
  ...Page
}

fragment Page on Query {
  me {
    id
    themeName
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
  "text": "query editQuery(\n  $domain: String!\n) {\n  web(domain: $domain) {\n    name\n    id\n  }\n  ...Page\n}\n\nfragment Page on Query {\n  me {\n    id\n    themeName\n  }\n}\n",
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
      },
      {
        "kind": "FragmentSpread",
        "name": "Page",
        "args": null
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
          v3
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2101a63e202f11e833ff887b16aca204';
module.exports = node;
