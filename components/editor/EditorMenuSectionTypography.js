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
  maximum: 4,
};

const typographySchema = {
  type: 'object',
  properties: {
    fontSize: { type: 'integer', minimum: 1, maximum: 64 },
    // TODO: Add enum with modular scale values.
    fontSizeScale: {
      type: 'number',
      minimum: 1,
      maximum: 4,
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
