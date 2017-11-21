// @flow
import * as React from 'react';
import Box from './Box';
import Text from './Text';
import { EditorMenuButton } from './EditorMenu';

const Arrow = () => <Text paddingHorizontal={0.5}>▸</Text>;

// const Circle = () => <Text paddingHorizontal={0.5}>•</Text>;

type EditorMenuBreadcrumbsProps = {|
  webName: string,
  pageName: string,
|};

const EditorMenuBreadcrumbs = ({
  webName,
  pageName,
}: EditorMenuBreadcrumbsProps) => (
  <Box flexDirection="row">
    <EditorMenuButton>{webName}</EditorMenuButton>
    <Arrow />
    <EditorMenuButton>{pageName}</EditorMenuButton>
    {/* <Circle />
    <EditorMenuButton>publish</EditorMenuButton> */}
  </Box>
);

export default EditorMenuBreadcrumbs;
