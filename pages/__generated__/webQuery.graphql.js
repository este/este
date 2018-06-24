/**
 * @flow
 * @relayHash de629c13696494a6bcc991a2cf2acae6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Web$ref = any;
export type webQueryVariables = {|
  id: string
|};
export type webQueryResponse = {|
  +web: ?{|
    +id: string
  |},
  +$fragmentRefs: AppPage$ref & Web$ref,
|};
*/


/*
query webQuery(
  $id: ID!
) {
  web(id: $id) {
    id
  }
  ...AppPage
  ...Web_1Bmzm5
}

fragment AppPage on Query {
  me {
    id
    themeName
  }
}

fragment Web_1Bmzm5 on Query {
  web(id: $id) {
    id
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
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
  "operationKind": "query",
  "name": "webQuery",
  "id": null,
  "text": "query webQuery(\n  $id: ID!\n) {\n  web(id: $id) {\n    id\n  }\n  ...AppPage\n  ...Web_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Web_1Bmzm5 on Query {\n  web(id: $id) {\n    id\n    name\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "webQuery",
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
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Web",
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "webQuery",
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
            "name": "name",
            "args": null,
            "storageKey": null
          }
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
          v2,
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
(node/*: any*/).hash = '224772394398e63482d492bfac9a4ee2';
module.exports = node;
