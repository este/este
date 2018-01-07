// @flow
import * as React from 'react';
import {
  EditorMenuSection,
  EditorMenuButton,
  EditorMenuInputs,
} from './EditorMenu';
import type { Web } from './Editor';
import { validateSchema } from './jsonSchema';
import EditorDispatch from './EditorDispatch';

export const lineHeightSchema = {
  type: 'number',
  minimum: 1,
  maximum: 2,
  // multipleOf does not work, for example 1.2 is inValid. Weird.
  // multipleOf: 0.1,
  // multipleOfPrecision does not work as well. 1.25 is valid. Wtf.
  multipleOfPrecision: 0.1,
};

const typographySchema = {
  type: 'object',
  properties: {
    fontSize: { type: 'integer', minimum: 1, maximum: 64 },
    fontSizeScale: {
      type: 'number',
      minimum: 1,
      maximum: 2,
      // http://www.modularscale.com/
      examples: [
        1,
        1.067,
        1.125,
        1.2,
        1.25,
        1.333,
        1.414,
        1.5,
        1.6,
        1.618,
        1.667,
        1.778,
        1.875,
        2,
      ],
    },
    lineHeight: lineHeightSchema,
    fontFamily: { type: 'string', minLength: 2, maxLength: 256 },
  },
};

validateSchema(typographySchema);

type EditorMenuSectionTypographyProps = {
  web: Web,
};

class EditorMenuSectionTypography extends React.PureComponent<
  EditorMenuSectionTypographyProps,
> {
  render() {
    return (
      <EditorDispatch>
        {dispatch => (
          <EditorMenuSection>
            <EditorMenuButton back section="theme" />
            <EditorMenuInputs
              onChange={typography => {
                dispatch({
                  type: 'SET_WEB_THEME_TYPOGRAPHY',
                  typography,
                });
              }}
              schema={typographySchema}
              object={this.props.web.theme.typography}
            />
          </EditorMenuSection>
        )}
      </EditorDispatch>
    );
  }
}

export default EditorMenuSectionTypography;
