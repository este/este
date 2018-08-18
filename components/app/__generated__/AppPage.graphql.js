/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type MainNav$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type AppPage$ref: FragmentReference;
export type AppPage = {|
  +me: ?{|
    +themeName: ?string
  |},
  +$fragmentRefs: MainNav$ref,
  +$refType: AppPage$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AppPage",
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
          "name": "themeName",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "MainNav",
      "args": [
        {
          "kind": "Variable",
          "name": "isPage",
          "variableName": "isPage",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "isWeb",
          "variableName": "isWeb",
          "type": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '16a2e0d255326332b259677817c73599';
module.exports = node;
