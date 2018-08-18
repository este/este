/**
 * @flow
 * @relayHash ec052c64ea3d0473a85455af5aeb1bcd
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
export type signInQueryVariables = {||};
export type signInQueryResponse = {|
  +$fragmentRefs: AppPage$ref
|};
export type signInQuery = {|
  variables: signInQueryVariables,
  response: signInQueryResponse,
|};
*/


/*
query signInQuery {
  ...AppPage
}

fragment AppPage on Query {
  me {
    themeName
    id
  }
  ...MainNav_4bqd3q
}

fragment MainNav_4bqd3q on Query {
  me {
    email
    id
  }
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "signInQuery",
  "id": null,
  "text": "query signInQuery {\n  ...AppPage\n}\n\nfragment AppPage on Query {\n  me {\n    themeName\n    id\n  }\n  ...MainNav_4bqd3q\n}\n\nfragment MainNav_4bqd3q on Query {\n  me {\n    email\n    id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "signInQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "signInQuery",
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "email",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
// prettier-ignore
(node/*: any*/).hash = 'bfd23836e585294d993b9d8f7677c8f7';
module.exports = node;
