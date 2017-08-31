/**
 * @flow
 * @relayHash c27bc7942aacc1fbfbaa1844d472a9db
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type meQueryResponse = {|
  +viewer: {|
    +user: ?{|
      +email: ?string;
    |};
  |};
|};
*/


/*
query meQuery {
  viewer {
    user {
      email
      id
    }
    ...CreateWeb_viewer
    id
  }
}

fragment CreateWeb_viewer on Viewer {
  user {
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "meQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "email",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "FragmentSpread",
            "name": "CreateWeb_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "meQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "meQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "User",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "email",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query meQuery {\n  viewer {\n    user {\n      email\n      id\n    }\n    ...CreateWeb_viewer\n    id\n  }\n}\n\nfragment CreateWeb_viewer on Viewer {\n  user {\n    id\n  }\n}\n"
};

module.exports = batch;
