// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuButton, EditorMenuSeparator } from './EditorMenu';
import type { Web, Path, EditorDispatch } from './Editor';
import { getElementKey } from './EditorElement';

type ChildrenProps = {
  pathChildren: *,
  onPress: *,
  activePath: Path,
};

class Children extends React.Component<ChildrenProps> {
  getChildPath(child) {
    const index = this.props.pathChildren.findIndex(item => item === child);
    return this.props.activePath.concat(index);
  }

  handleChildrenButtonOnPress = child => () => {
    const path = this.getChildPath(child);
    this.props.onPress(path)();
  };

  renderChildren(elementChildren) {
    return elementChildren.map((child, index) => (
      <React.Fragment key={getElementKey(child)}>
        {index !== 0 && <EditorMenuSeparator type="sibling" />}
        <EditorMenuButton onPress={this.handleChildrenButtonOnPress(child)}>
          {child.type}
        </EditorMenuButton>
      </React.Fragment>
    ));
  }

  render() {
    // Only elements, not strings.
    const elementChildren = this.props.pathChildren.filter(
      item => typeof item !== 'string',
    );
    if (elementChildren.length === 0) return null;

    return (
      <React.Fragment>
        <EditorMenuSeparator />
        {this.renderChildren(elementChildren)}
      </React.Fragment>
    );
  }
}

const PathButtons = ({ activePath, elements, dispatch }) => {
  let pathChildren = elements;
  let stringFound = false;
  let buttonPath = [];

  const onPress = path => () => dispatch({ type: 'SET_ACTIVE_PATH', path });

  const buttons = activePath.reduce((buttons, pathIndex, index) => {
    const child = pathChildren[pathIndex];
    // Written like this because of Flow type refinements.
    if (stringFound || typeof child === 'string') {
      stringFound = true;
      return buttons;
    }
    pathChildren = child.props.children;
    const key = getElementKey(child);
    const isLast = index === activePath.length - 1;
    buttonPath = buttonPath.concat(pathIndex);
    return [
      ...buttons,
      <React.Fragment key={key}>
        <EditorMenuSeparator />
        <EditorMenuButton
          autoFocus={isLast ? activePath : false}
          onPress={onPress(buttonPath)}
        >
          {child.type}
        </EditorMenuButton>
      </React.Fragment>,
    ];
  }, []);

  return [
    ...buttons,
    <Children
      key="children"
      onPress={onPress}
      pathChildren={pathChildren}
      activePath={activePath}
    />,
  ];
};

type EditorMenuBreadcrumbsProps = {|
  activePath: Path,
  dispatch: EditorDispatch,
  pageName: string,
  web: Web,
  webName: string,
  setActiveSection: *,
|};

const EditorMenuBreadcrumbs = ({
  activePath,
  dispatch,
  pageName,
  web,
  webName,
  setActiveSection,
}: EditorMenuBreadcrumbsProps) => {
  const onPress = section => () => setActiveSection(section);

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Box flexDirection="row" flexWrap="wrap">
        <EditorMenuButton autoFocus onPress={onPress('web')}>
          {webName}
        </EditorMenuButton>
        <EditorMenuSeparator />
        <EditorMenuButton onPress={onPress('page')}>
          {pageName}
        </EditorMenuButton>
        <PathButtons
          activePath={activePath}
          elements={web.pages[pageName]}
          dispatch={dispatch}
        />
      </Box>
      <EditorMenuButton flexDirection="row" onPress={onPress('hamburger')}>
        ☰
      </EditorMenuButton>
    </Box>
  );
};

export default EditorMenuBreadcrumbs;
