/**
 * @flow
 * @relayHash 2085995630fce857e5a0ced05bb20c32
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Page$ref = any;
export type pageQueryVariables = {|
  id: string
|};
export type pageQueryResponse = {|
  +page: ?{|
    +title: string,
    +web: {|
      +id: string,
      +name: string,
    |},
  |},
  +$fragmentRefs: AppPage$ref & Page$ref,
|};
*/


/*
query pageQuery(
  $id: ID!
) {
  page(id: $id) {
    title
    web {
      id
      name
    }
    id
  }
  ...AppPage
  ...Page_1Bmzm5
}

fragment AppPage on Query {
  me {
    id
    themeName
  }
}

fragment Page_1Bmzm5 on Query {
  page(id: $id) {
    id
    title
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
  "name": "title",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "web",
  "storageKey": null,
  "args": null,
  "concreteType": "Web",
  "plural": false,
  "selections": [
    v3,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "pageQuery",
  "id": null,
  "text": "query pageQuery(\n  $id: ID!\n) {\n  page(id: $id) {\n    title\n    web {\n      id\n      name\n    }\n    id\n  }\n  ...AppPage\n  ...Page_1Bmzm5\n}\n\nfragment AppPage on Query {\n  me {\n    id\n    themeName\n  }\n}\n\nfragment Page_1Bmzm5 on Query {\n  page(id: $id) {\n    id\n    title\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "pageQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v1,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v2,
          v4
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      },
      {
        "kind": "FragmentSpread",
        "name": "Page",
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
    "name": "pageQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v1,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v2,
          v4,
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
(node/*: any*/).hash = 'ecf3e90aafed3a0b977d0ced6b65e358';
module.exports = node;
