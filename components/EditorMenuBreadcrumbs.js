// @flow
import * as React from 'react';
import Box from './Box';
import { EditorMenuButton, Separator, type Section } from './EditorMenu';
import type { Web, Path } from './Editor';
import { getElementKey } from './EditorElement';

type EditorMenuBreadcrumbsProps = {|
  web: Web,
  webName: string,
  pageName: string,
  activePath: Path,
  onSelectSection: (section: Section) => void,
  shownSection: ?Section,
|};

const PathButtons = ({ activePath, elements }) => {
  if (activePath.length === 0) return null;
  let children = elements;
  return activePath.reduce((elements, pathIndex) => {
    const child = children[pathIndex];
    // Skip text. Editor will be shown instead.
    if (typeof child === 'string') return elements;
    // eslint-disable-next-line prefer-destructuring
    children = child.props.children;
    const key = getElementKey(child);
    return [
      ...elements,
      <Separator key={`${key}-arrow`} />,
      // autoFocus is smart. Is will focus only on different activePath.
      <EditorMenuButton autoFocus={activePath} key={key}>
        {child.type}
      </EditorMenuButton>,
    ];
  }, []);
};

const HamburgerButton = props => (
  <EditorMenuButton {...props}>☰</EditorMenuButton>
);

const EditorMenuBreadcrumbs = ({
  web,
  webName,
  pageName,
  activePath,
  onSelectSection,
  shownSection,
}: EditorMenuBreadcrumbsProps) => (
  <Box flexDirection="row" justifyContent="space-between">
    <Box flexDirection="row" flexWrap="wrap">
      <EditorMenuButton>{webName}</EditorMenuButton>
      <Separator />
      <EditorMenuButton>{pageName}</EditorMenuButton>
      <PathButtons activePath={activePath} elements={web.pages[pageName]} />
    </Box>
    <Box flexDirection="row">
      <HamburgerButton
        active={shownSection === 'hamburger'}
        onPress={() => onSelectSection('hamburger')}
      />
    </Box>
  </Box>
);

export default EditorMenuBreadcrumbs;
