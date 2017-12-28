// @flow
import * as React from 'react';
import {
  EditorMenuSection,
  EditorMenuButton,
  EditorMenuInputs,
} from './EditorMenu';
import type { Web } from './Editor';
import { validateSchema } from './jsonSchema';

// TODO: Naplno.
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

const EditorMenuSectionTypography = ({
  web: { theme: { typography } },
}: EditorMenuSectionTypographyProps) => (
  <EditorMenuSection>
    <EditorMenuButton back section="theme" />
    <EditorMenuInputs schema={typographySchema} object={typography} />
  </EditorMenuSection>
);

export default EditorMenuSectionTypography;
