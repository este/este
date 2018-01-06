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

const typographySchema = {
  type: 'object',
  properties: {
    fontSize: { type: 'integer', minimum: 1, maximum: 64 },
    fontSizeScale: { type: 'number', minimum: 1, maximum: 4 },
    lineHeight: { type: 'integer', minimum: 1, maximum: 512 },
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
              onChange={object => {
                // console.log(object);
                // dispatch({
                //   type: 'SET_WEB',
                //   path: ['theme', 'typography'],
                //   value: object,
                // });
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
