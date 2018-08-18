/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MainNav$ref: FragmentReference;
export type MainNav = {|
  +me: ?{|
    +email: string
  |},
  +web?: ?{|
    +id: string,
    +draftName: string,
  |},
  +page?: ?{|
    +id: string,
    +draftTitle: string,
    +web: {|
      +id: string,
      +name: string,
    |},
  |},
  +$refType: MainNav$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "MainNav",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "isPage",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "isWeb",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "RootArgument",
      "name": "id",
      "type": "ID!"
    }
  ],
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
          "name": "email",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "isPage",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "page",
          "storageKey": null,
          "args": v0,
          "concreteType": "Page",
          "plural": false,
          "selections": [
            v1,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "draftTitle",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "web",
              "storageKey": null,
              "args": null,
              "concreteType": "Web",
              "plural": false,
              "selections": [
                v1,
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
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "isWeb",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "web",
          "storageKey": null,
          "args": v0,
          "concreteType": "Web",
          "plural": false,
          "selections": [
            v1,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "draftName",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '6ebb6b806e4fdd01acf29a708ea972fe';
module.exports = node;
