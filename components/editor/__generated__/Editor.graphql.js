/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
export type BorderValueUnit = "POINT";
export type DimensionValueUnit = "KEYWORD" | "PERCENTAGE" | "POINT";
export type ElementType = "BLOCK" | "INLINE" | "TEXT";
export type StyleAlignContent = "CENTER" | "FLEX_END" | "FLEX_START" | "SPACE_AROUND" | "SPACE_BETWEEN" | "STRETCH";
export type StyleAlignItems = "BASELINE" | "CENTER" | "FLEX_END" | "FLEX_START" | "STRETCH";
export type StyleAlignSelf = "AUTO" | "BASELINE" | "CENTER" | "FLEX_END" | "FLEX_START" | "STRETCH";
export type StyleBorderStyle = "DASHED" | "DOTTED" | "SOLID";
export type StyleDirection = "INHERIT" | "LTR" | "RTL";
export type StyleDisplay = "FLEX" | "NONE";
export type StyleFlexDirection = "COLUMN" | "COLUMN_REVERSE" | "ROW" | "ROW_REVERSE";
export type StyleFlexWrap = "NOWRAP" | "WRAP" | "WRAP_REVERSE";
export type StyleFontStyle = "ITALIC" | "NORMAL";
export type StyleFontVariant = "SMALL_CAPS";
export type StyleFontWeight = "BOLD" | "INT_100" | "INT_200" | "INT_300" | "INT_400" | "INT_500" | "INT_600" | "INT_700" | "INT_800" | "INT_900" | "NORMAL";
export type StyleJustifyContent = "CENTER" | "FLEX_END" | "FLEX_START" | "SPACE_AROUND" | "SPACE_BETWEEN" | "SPACE_EVENLY";
export type StyleOverflow = "HIDDEN" | "SCROLL" | "VISIBLE";
export type StylePosition = "ABSOLUTE" | "RELATIVE";
export type StyleTextAlign = "AUTO" | "CENTER" | "JUSTIFY" | "LEFT" | "RIGHT";
export type StyleTextAlignVertical = "AUTO" | "BOTTOM" | "CENTER" | "TOP";
export type StyleTextDecorationLine = "LINE_THROUGH" | "NONE" | "UNDERLINE" | "UNDERLINE_LINE_THROUGH";
export type StyleTextTransform = "CAPITALIZE" | "LOWERCASE" | "NONE" | "UPPERCASE";
import type { FragmentReference } from "relay-runtime";
declare export opaque type Editor$ref: FragmentReference;
export type Editor = {|
  +page: ?{|
    +id: string,
    +element: {|
      +id: string
    |},
    +web: {|
      +borderValues: ?$ReadOnlyArray<{|
        +id: string,
        +name: ?string,
        +unit: BorderValueUnit,
        +value: number,
      |}>,
      +colorValues: ?$ReadOnlyArray<{|
        +id: string,
        +name: ?string,
        +r: number,
        +g: number,
        +b: number,
        +a: ?number,
      |}>,
      +dimensionValues: ?$ReadOnlyArray<{|
        +id: string,
        +name: ?string,
        +unit: DimensionValueUnit,
        +value: number,
      |}>,
      +styles: ?$ReadOnlyArray<{|
        +id: string,
        +spreadStyles: ?$ReadOnlyArray<{|
          +index: number,
          +style: {|
            +id: string
          |},
        |}>,
        +nextStyle: ?{|
          +id: string
        |},
        +isText: ?boolean,
        +name: string,
        +display: ?StyleDisplay,
        +width: ?{|
          +id: string
        |},
        +height: ?{|
          +id: string
        |},
        +bottom: ?{|
          +id: string
        |},
        +end: ?{|
          +id: string
        |},
        +left: ?{|
          +id: string
        |},
        +right: ?{|
          +id: string
        |},
        +start: ?{|
          +id: string
        |},
        +top: ?{|
          +id: string
        |},
        +minWidth: ?{|
          +id: string
        |},
        +maxWidth: ?{|
          +id: string
        |},
        +minHeight: ?{|
          +id: string
        |},
        +maxHeight: ?{|
          +id: string
        |},
        +margin: ?{|
          +id: string
        |},
        +marginBottom: ?{|
          +id: string
        |},
        +marginEnd: ?{|
          +id: string
        |},
        +marginHorizontal: ?{|
          +id: string
        |},
        +marginLeft: ?{|
          +id: string
        |},
        +marginRight: ?{|
          +id: string
        |},
        +marginStart: ?{|
          +id: string
        |},
        +marginTop: ?{|
          +id: string
        |},
        +marginVertical: ?{|
          +id: string
        |},
        +padding: ?{|
          +id: string
        |},
        +paddingBottom: ?{|
          +id: string
        |},
        +paddingEnd: ?{|
          +id: string
        |},
        +paddingHorizontal: ?{|
          +id: string
        |},
        +paddingLeft: ?{|
          +id: string
        |},
        +paddingRight: ?{|
          +id: string
        |},
        +paddingStart: ?{|
          +id: string
        |},
        +paddingTop: ?{|
          +id: string
        |},
        +paddingVertical: ?{|
          +id: string
        |},
        +position: ?StylePosition,
        +flexDirection: ?StyleFlexDirection,
        +flexWrap: ?StyleFlexWrap,
        +justifyContent: ?StyleJustifyContent,
        +alignItems: ?StyleAlignItems,
        +alignSelf: ?StyleAlignSelf,
        +alignContent: ?StyleAlignContent,
        +overflow: ?StyleOverflow,
        +flex: ?number,
        +flexGrow: ?number,
        +flexShrink: ?number,
        +flexBasis: ?number,
        +zIndex: ?number,
        +direction: ?StyleDirection,
        +backgroundColor: ?{|
          +id: string
        |},
        +borderColor: ?{|
          +id: string
        |},
        +borderBottomColor: ?{|
          +id: string
        |},
        +borderEndColor: ?{|
          +id: string
        |},
        +borderLeftColor: ?{|
          +id: string
        |},
        +borderRightColor: ?{|
          +id: string
        |},
        +borderStartColor: ?{|
          +id: string
        |},
        +borderTopColor: ?{|
          +id: string
        |},
        +borderRadius: ?{|
          +id: string
        |},
        +borderBottomEndRadius: ?{|
          +id: string
        |},
        +borderBottomLeftRadius: ?{|
          +id: string
        |},
        +borderBottomRightRadius: ?{|
          +id: string
        |},
        +borderBottomStartRadius: ?{|
          +id: string
        |},
        +borderTopEndRadius: ?{|
          +id: string
        |},
        +borderTopLeftRadius: ?{|
          +id: string
        |},
        +borderTopRightRadius: ?{|
          +id: string
        |},
        +borderTopStartRadius: ?{|
          +id: string
        |},
        +borderStyle: ?StyleBorderStyle,
        +borderWidth: ?{|
          +id: string
        |},
        +borderBottomWidth: ?{|
          +id: string
        |},
        +borderEndWidth: ?{|
          +id: string
        |},
        +borderLeftWidth: ?{|
          +id: string
        |},
        +borderRightWidth: ?{|
          +id: string
        |},
        +borderStartWidth: ?{|
          +id: string
        |},
        +borderTopWidth: ?{|
          +id: string
        |},
        +opacity: ?number,
        +color: ?{|
          +id: string
        |},
        +fontFamily: ?string,
        +fontSize: ?number,
        +fontStyle: ?StyleFontStyle,
        +fontWeight: ?StyleFontWeight,
        +fontVariant: ?StyleFontVariant,
        +letterSpacing: ?number,
        +lineHeight: ?number,
        +textAlign: ?StyleTextAlign,
        +textAlignVertical: ?StyleTextAlignVertical,
        +textDecorationLine: ?StyleTextDecorationLine,
        +textTransform: ?StyleTextTransform,
      |}>,
      +elements: ?$ReadOnlyArray<{|
        +id: string,
        +children: ?$ReadOnlyArray<{|
          +id: string
        |}>,
        +style: ?{|
          +id: string
        |},
        +index: number,
        +type: ElementType,
        +textLeaves: ?any,
      |}>,
    |},
  |},
  +$refType: Editor$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
  v0
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = [
  v0,
  v2,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "unit",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "value",
    "args": null,
    "storageKey": null
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "index",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "style",
  "storageKey": null,
  "args": null,
  "concreteType": "Style",
  "plural": false,
  "selections": v1
};
return {
  "kind": "Fragment",
  "name": "Editor",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "id",
      "type": "ID!",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "page",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id",
          "type": "ID!"
        }
      ],
      "concreteType": "Page",
      "plural": false,
      "selections": [
        v0,
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "element",
          "storageKey": null,
          "args": null,
          "concreteType": "Element",
          "plural": false,
          "selections": v1
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
              "selections": v3
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
                v0,
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
              "selections": v3
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
                v0,
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "nextStyle",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Style",
                  "plural": false,
                  "selections": v1
                },
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
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "height",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "bottom",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "end",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "left",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "right",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "start",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "top",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "minWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "maxWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "minHeight",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "maxHeight",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "margin",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginBottom",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginEnd",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginHorizontal",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginLeft",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginRight",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginStart",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginTop",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "marginVertical",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "padding",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingBottom",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingEnd",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingHorizontal",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingLeft",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingRight",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingStart",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingTop",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "paddingVertical",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "DimensionValue",
                  "plural": false,
                  "selections": v1
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
                    v4,
                    v5
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
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderEndColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderLeftColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderRightColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderStartColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopColor",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "ColorValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomEndRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomLeftRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomRightRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomStartRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopEndRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopLeftRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopRightRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopStartRadius",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
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
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderBottomWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderEndWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderLeftWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderRightWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderStartWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "borderTopWidth",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "BorderValue",
                  "plural": false,
                  "selections": v1
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
                  "selections": v1
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
                v0,
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "children",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Element",
                  "plural": true,
                  "selections": v1
                },
                v5,
                v4,
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "type",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "textLeaves",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '95aa6cfd62a773afbe34e4daba4c3f2d';
module.exports = node;
