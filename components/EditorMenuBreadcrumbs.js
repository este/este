// @flow
import * as React from 'react';
import Box from './Box';
import Text from './Text';
import { EditorMenuButton } from './EditorMenu';
import type { Web, Path } from './Editor';

const Arrow = () => <Text paddingHorizontal={0.5}>▸</Text>;

// const Circle = () => <Text paddingHorizontal={0.5}>•</Text>;

type EditorMenuBreadcrumbsProps = {|
  web: Web,
  webName: string,
  pageName: string,
  activePath: Path,
|};

const PathButtons = ({ elements, activePath }) => (
  <EditorMenuButton>
    {elements.length} {activePath}
  </EditorMenuButton>
);

const EditorMenuBreadcrumbs = ({
  web,
  webName,
  pageName,
  activePath,
}: EditorMenuBreadcrumbsProps) => (
  <Box flexDirection="row">
    <EditorMenuButton>{webName}</EditorMenuButton>
    <Arrow />
    <EditorMenuButton>{pageName}</EditorMenuButton>
    {activePath.length > 0 && (
      <PathButtons elements={web.pages[pageName]} activePath={activePath} />
    )}
    {/* <Circle />
      <EditorMenuButton>publish</EditorMenuButton> */}
  </Box>
);

export default EditorMenuBreadcrumbs;
