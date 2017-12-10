// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuButton, Separator } from './EditorMenu';
import type { Web, Path, EditorDispatch, SectionName } from './Editor';
import { getElementKey } from './EditorElement';

type EditorMenuBreadcrumbsProps = {|
  activePath: Path,
  activeSection: SectionName,
  dispatch: EditorDispatch,
  pageName: string,
  web: Web,
  webName: string,
|};

const PathButtons = ({ activePath, elements, dispatch }) => {
  if (activePath.length === 0) return null;
  let pathChildren = elements;
  let textFound = false;
  let buttonPath = [];

  const buttons = activePath.reduce((buttons, pathIndex, index) => {
    const child = pathChildren[pathIndex];
    // Have to be written like this, because of Flow type refinements.
    if (textFound || typeof child === 'string') {
      textFound = true;
      return buttons;
    }
    pathChildren = child.props.children;
    const key = getElementKey(child);
    const isLast = index === activePath.length - 1;
    buttonPath = buttonPath.concat(pathIndex);
    const path = buttonPath; // Yep, closure.
    return [
      ...buttons,
      <React.Fragment key={key}>
        <Separator />
        <EditorMenuButton
          autoFocus={isLast ? activePath : false}
          onPress={() => dispatch({ type: 'SET_ACTIVE_PATH', path })}
        >
          {child.type}
        </EditorMenuButton>
      </React.Fragment>,
    ];
  }, []);

  const hasElementChildren =
    pathChildren.length > 0 &&
    pathChildren.every(child => typeof child === 'object');

  if (!hasElementChildren) return buttons;

  return buttons.concat(
    <React.Fragment key="children">
      <Separator />
      <EditorMenuButton
        onPress={() =>
          dispatch({ type: 'SET_ACTIVE_SECTION', section: 'children' })
        }
      >
        …
      </EditorMenuButton>
    </React.Fragment>,
  );
};

const EditorMenuBreadcrumbs = ({
  activePath,
  activeSection,
  dispatch,
  pageName,
  web,
  webName,
}: EditorMenuBreadcrumbsProps) => {
  const button = section => ({
    active: activeSection === section,
    onPress: () => dispatch({ type: 'SET_ACTIVE_SECTION', section }),
  });

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="row" flexWrap="wrap">
        <EditorMenuButton {...button('web')}>{webName}</EditorMenuButton>
        <Separator />
        <EditorMenuButton {...button('page')}>{pageName}</EditorMenuButton>
        <PathButtons
          activePath={activePath}
          elements={web.pages[pageName]}
          dispatch={dispatch}
        />
      </Box>
      <EditorMenuButton flexDirection="row" {...button('hamburger')}>
        ☰
      </EditorMenuButton>
    </Box>
  );
};

export default EditorMenuBreadcrumbs;
