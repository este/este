/**
 * @flow
 * @relayHash e6008e22ca3c0c59dea388b17e02dcd2
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
export type meQueryVariables = {||};
export type meQueryResponse = {|
  +me: ?{|
    +email: string
  |},
  +$fragmentRefs: AppPage$ref,
|};
*/


/*
query meQuery {
  ...AppPage
  me {
    email
    id
  }
}

fragment AppPage on Query {
  me {
    themeName
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "email",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "meQuery",
  "id": null,
  "text": "query meQuery {\n  ...AppPage\n  me {\n    email\n    id\n  }\n}\n\nfragment AppPage on Query {\n  me {\n    themeName\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "meQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
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
          v0
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "meQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "themeName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          v0
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8167af7cefa7da02d41a88ee2b420d55';
module.exports = node;
