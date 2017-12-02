// @flow
import * as React from 'react';
import Box from './Box';
import Text from './Text';
import { EditorMenuButton } from './EditorMenu';
import type { Web, Path } from './Editor';
import { getElementKey } from './EditorElement';

// backgroundColor="black", because fixBrowserFontSmoothing
const Arrow = () => (
  <Text backgroundColor="black" marginHorizontal={0.25}>
    ▸
  </Text>
);

// const Circle = () => <Text backgroundColor="black" paddingHorizontal={0.5}>•</Text>;

type EditorMenuBreadcrumbsProps = {|
  web: Web,
  webName: string,
  pageName: string,
  activePath: Path,
|};

const PathButtons = ({ activePath, elements }) => {
  if (activePath.length === 0) return null;
  let children = elements;
  return activePath.reduce((elements, pathIndex) => {
    const child = children[pathIndex];
    // Skip text.
    if (typeof child === 'string') return elements;
    // eslint-disable-next-line prefer-destructuring
    children = child.props.children;
    const key = getElementKey(child);
    return [
      ...elements,
      <Arrow key={`${key}-arrow`} />,
      <EditorMenuButton key={key}>{child.type}</EditorMenuButton>,
    ];
  }, []);
};

const EditorMenuBreadcrumbs = ({
  web,
  webName,
  pageName,
  activePath,
}: EditorMenuBreadcrumbsProps) => (
  <Box flexDirection="row" flexWrap="wrap">
    <EditorMenuButton>{webName}</EditorMenuButton>
    <Arrow />
    <EditorMenuButton>{pageName}</EditorMenuButton>
    <PathButtons activePath={activePath} elements={web.pages[pageName]} />
    {/* <Circle />
      <EditorMenuButton>publish</EditorMenuButton> */}
  </Box>
);

export default EditorMenuBreadcrumbs;
