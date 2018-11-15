/**
 * @flow
 * @relayHash cd445e4263f5223b2cd5a28c6b6807a7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type AppPage$ref = any;
type Editor$ref = any;
export type editorQueryVariables = {|
  id: string,
  isPage: boolean,
|};
export type editorQueryResponse = {|
  +$fragmentRefs: AppPage$ref & Editor$ref
|};
export type editorQuery = {|
  variables: editorQueryVariables,
  response: editorQueryResponse,
|};
*/


/*
query editorQuery(
  $id: ID!
  $isPage: Boolean!
) {
  ...AppPage_16EYnK
  ...Editor_1Bmzm5
}

fragment AppPage_16EYnK on Query {
  me {
    themeName
    id
  }
  ...MainNav_1ppZvl
}

fragment Editor_1Bmzm5 on Query {
  components {
    id
    name
    props {
      id
      name
      type
    }
  }
  page(id: $id) {
    id
    title
    element {
      id
    }
    web {
      borderValues {
        id
        name
        unit
        value
      }
      colorValues {
        id
        name
        r
        g
        b
        a
      }
      dimensionValues {
        id
        name
        unit
        value
      }
      styles {
        id
        spreadStyles {
          index
          style {
            id
          }
          id
        }
        isText
        name
        display
        width {
          id
        }
        height {
          id
        }
        bottom {
          id
        }
        end {
          id
        }
        left {
          id
        }
        right {
          id
        }
        start {
          id
        }
        top {
          id
        }
        minWidth {
          id
        }
        maxWidth {
          id
        }
        minHeight {
          id
        }
        maxHeight {
          id
        }
        margin {
          id
        }
        marginBottom {
          id
        }
        marginEnd {
          id
        }
        marginHorizontal {
          id
        }
        marginLeft {
          id
        }
        marginRight {
          id
        }
        marginStart {
          id
        }
        marginTop {
          id
        }
        marginVertical {
          id
        }
        padding {
          id
        }
        paddingBottom {
          id
        }
        paddingEnd {
          id
        }
        paddingHorizontal {
          id
        }
        paddingLeft {
          id
        }
        paddingRight {
          id
        }
        paddingStart {
          id
        }
        paddingTop {
          id
        }
        paddingVertical {
          id
        }
        position
        flexDirection
        flexWrap
        justifyContent
        alignItems
        alignSelf
        alignContent
        overflow
        flex
        flexGrow
        flexShrink
        flexBasis
        zIndex
        direction
        backgroundColor {
          id
        }
        borderColor {
          id
        }
        borderBottomColor {
          id
        }
        borderEndColor {
          id
        }
        borderLeftColor {
          id
        }
        borderRightColor {
          id
        }
        borderStartColor {
          id
        }
        borderTopColor {
          id
        }
        borderRadius {
          id
        }
        borderBottomEndRadius {
          id
        }
        borderBottomLeftRadius {
          id
        }
        borderBottomRightRadius {
          id
        }
        borderBottomStartRadius {
          id
        }
        borderTopEndRadius {
          id
        }
        borderTopLeftRadius {
          id
        }
        borderTopRightRadius {
          id
        }
        borderTopStartRadius {
          id
        }
        borderStyle
        borderWidth {
          id
        }
        borderBottomWidth {
          id
        }
        borderEndWidth {
          id
        }
        borderLeftWidth {
          id
        }
        borderRightWidth {
          id
        }
        borderStartWidth {
          id
        }
        borderTopWidth {
          id
        }
        opacity
        color {
          id
        }
        fontFamily
        fontSize
        fontStyle
        fontWeight
        fontVariant
        letterSpacing
        lineHeight
        textAlign
        textAlignVertical
        textDecorationLine
        textTransform
      }
      elements {
        id
        index
        type
        textLeaves
        children {
          id
        }
        component {
          id
        }
        props {
          id
          name
          type
          valueStyle {
            id
          }
          value
        }
      }
      id
    }
  }
}

fragment MainNav_1ppZvl on Query {
  me {
    email
    id
  }
  page(id: $id) @include(if: $isPage) {
    id
    web {
      id
      name
    }
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
  },
  {
    "kind": "LocalArgument",
    "name": "isPage",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
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
  "name": "type",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id",
    "type": "ID!"
  }
],
v5 = [
  v1
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "value",
  "args": null,
  "storageKey": null
},
v7 = [
  v1,
  v2,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "unit",
    "args": null,
    "storageKey": null
  },
  v6
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "index",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "editorQuery",
  "id": null,
  "text": "query editorQuery(\n  $id: ID!\n  $isPage: Boolean!\n) {\n  ...AppPage_16EYnK\n  ...Editor_1Bmzm5\n}\n\nfragment AppPage_16EYnK on Query {\n  me {\n    themeName\n    id\n  }\n  ...MainNav_1ppZvl\n}\n\nfragment Editor_1Bmzm5 on Query {\n  components {\n    id\n    name\n    props {\n      id\n      name\n      type\n    }\n  }\n  page(id: $id) {\n    id\n    title\n    element {\n      id\n    }\n    web {\n      borderValues {\n        id\n        name\n        unit\n        value\n      }\n      colorValues {\n        id\n        name\n        r\n        g\n        b\n        a\n      }\n      dimensionValues {\n        id\n        name\n        unit\n        value\n      }\n      styles {\n        id\n        spreadStyles {\n          index\n          style {\n            id\n          }\n          id\n        }\n        isText\n        name\n        display\n        width {\n          id\n        }\n        height {\n          id\n        }\n        bottom {\n          id\n        }\n        end {\n          id\n        }\n        left {\n          id\n        }\n        right {\n          id\n        }\n        start {\n          id\n        }\n        top {\n          id\n        }\n        minWidth {\n          id\n        }\n        maxWidth {\n          id\n        }\n        minHeight {\n          id\n        }\n        maxHeight {\n          id\n        }\n        margin {\n          id\n        }\n        marginBottom {\n          id\n        }\n        marginEnd {\n          id\n        }\n        marginHorizontal {\n          id\n        }\n        marginLeft {\n          id\n        }\n        marginRight {\n          id\n        }\n        marginStart {\n          id\n        }\n        marginTop {\n          id\n        }\n        marginVertical {\n          id\n        }\n        padding {\n          id\n        }\n        paddingBottom {\n          id\n        }\n        paddingEnd {\n          id\n        }\n        paddingHorizontal {\n          id\n        }\n        paddingLeft {\n          id\n        }\n        paddingRight {\n          id\n        }\n        paddingStart {\n          id\n        }\n        paddingTop {\n          id\n        }\n        paddingVertical {\n          id\n        }\n        position\n        flexDirection\n        flexWrap\n        justifyContent\n        alignItems\n        alignSelf\n        alignContent\n        overflow\n        flex\n        flexGrow\n        flexShrink\n        flexBasis\n        zIndex\n        direction\n        backgroundColor {\n          id\n        }\n        borderColor {\n          id\n        }\n        borderBottomColor {\n          id\n        }\n        borderEndColor {\n          id\n        }\n        borderLeftColor {\n          id\n        }\n        borderRightColor {\n          id\n        }\n        borderStartColor {\n          id\n        }\n        borderTopColor {\n          id\n        }\n        borderRadius {\n          id\n        }\n        borderBottomEndRadius {\n          id\n        }\n        borderBottomLeftRadius {\n          id\n        }\n        borderBottomRightRadius {\n          id\n        }\n        borderBottomStartRadius {\n          id\n        }\n        borderTopEndRadius {\n          id\n        }\n        borderTopLeftRadius {\n          id\n        }\n        borderTopRightRadius {\n          id\n        }\n        borderTopStartRadius {\n          id\n        }\n        borderStyle\n        borderWidth {\n          id\n        }\n        borderBottomWidth {\n          id\n        }\n        borderEndWidth {\n          id\n        }\n        borderLeftWidth {\n          id\n        }\n        borderRightWidth {\n          id\n        }\n        borderStartWidth {\n          id\n        }\n        borderTopWidth {\n          id\n        }\n        opacity\n        color {\n          id\n        }\n        fontFamily\n        fontSize\n        fontStyle\n        fontWeight\n        fontVariant\n        letterSpacing\n        lineHeight\n        textAlign\n        textAlignVertical\n        textDecorationLine\n        textTransform\n      }\n      elements {\n        id\n        index\n        type\n        textLeaves\n        children {\n          id\n        }\n        component {\n          id\n        }\n        props {\n          id\n          name\n          type\n          valueStyle {\n            id\n          }\n          value\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment MainNav_1ppZvl on Query {\n  me {\n    email\n    id\n  }\n  page(id: $id) @include(if: $isPage) {\n    id\n    web {\n      id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "editorQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "AppPage",
        "args": [
          {
            "kind": "Variable",
            "name": "isPage",
            "variableName": "isPage",
            "type": null
          }
        ]
      },
      {
        "kind": "FragmentSpread",
        "name": "Editor",
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
    "name": "editorQuery",
    "argumentDefinitions": v0,
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
          v1,
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
        "kind": "LinkedField",
        "alias": null,
        "name": "components",
        "storageKey": null,
        "args": null,
        "concreteType": "Component",
        "plural": true,
        "selections": [
          v1,
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "props",
            "storageKey": null,
            "args": null,
            "concreteType": "ComponentProp",
            "plural": true,
            "selections": [
              v1,
              v2,
              v3
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "page",
        "storageKey": null,
        "args": v4,
        "concreteType": "Page",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarHandle",
            "alias": null,
            "name": "title",
            "args": null,
            "handle": "draft",
            "key": "",
            "filters": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "element",
            "storageKey": null,
            "args": null,
            "concreteType": "Element",
            "plural": false,
            "selections": v5
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "borderValues",
                "storageKey": null,
                "args": null,
                "concreteType": "BorderValue",
                "plural": true,
                "selections": v7
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "colorValues",
                "storageKey": null,
                "args": null,
                "concreteType": "ColorValue",
                "plural": true,
                "selections": [
                  v1,
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "r",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "g",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "b",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "a",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "dimensionValues",
                "storageKey": null,
                "args": null,
                "concreteType": "DimensionValue",
                "plural": true,
                "selections": v7
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "styles",
                "storageKey": null,
                "args": null,
                "concreteType": "Style",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flex",
                    "args": null,
                    "storageKey": null
                  },
                  v1,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "isText",
                    "args": null,
                    "storageKey": null
                  },
                  v2,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "display",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "width",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "height",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "bottom",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "end",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "left",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "right",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "start",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "top",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "minWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "maxWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "minHeight",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "maxHeight",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "margin",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginBottom",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginEnd",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginHorizontal",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginLeft",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginRight",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginStart",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginTop",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "marginVertical",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "padding",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingBottom",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingEnd",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingHorizontal",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingLeft",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingRight",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingStart",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingTop",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "paddingVertical",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DimensionValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "position",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flexDirection",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flexWrap",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "justifyContent",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "alignItems",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "alignSelf",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "alignContent",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "overflow",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "spreadStyles",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "StyleSpread",
                    "plural": true,
                    "selections": [
                      v8,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "style",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Style",
                        "plural": false,
                        "selections": v5
                      },
                      v1
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flexGrow",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flexShrink",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "flexBasis",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "zIndex",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "direction",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "backgroundColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderEndColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderLeftColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderRightColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderStartColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopColor",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomEndRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomLeftRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomRightRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomStartRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopEndRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopLeftRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopRightRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopStartRadius",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "borderStyle",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderBottomWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderEndWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderLeftWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderRightWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderStartWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "borderTopWidth",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BorderValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "opacity",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "color",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ColorValue",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fontFamily",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fontSize",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fontStyle",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fontWeight",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fontVariant",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "letterSpacing",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "lineHeight",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "textAlign",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "textAlignVertical",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "textDecorationLine",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "textTransform",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "elements",
                "storageKey": null,
                "args": null,
                "concreteType": "Element",
                "plural": true,
                "selections": [
                  v1,
                  v8,
                  v3,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "textLeaves",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "children",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Element",
                    "plural": true,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "component",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Component",
                    "plural": false,
                    "selections": v5
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "props",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ElementProp",
                    "plural": true,
                    "selections": [
                      v1,
                      v2,
                      v3,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "valueStyle",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Style",
                        "plural": false,
                        "selections": v5
                      },
                      v6
                    ]
                  }
                ]
              },
              v1
            ]
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
            "args": v4,
            "concreteType": "Page",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "web",
                "storageKey": null,
                "args": null,
                "concreteType": "Web",
                "plural": false,
                "selections": [
                  v2
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '84af631e1cdd8ad21ea806bd147e3ad6';
module.exports = node;
