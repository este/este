// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuSeparator } from './EditorMenu';
import EditorMenuButton from './EditorMenuButton';
import type { Web, Path } from './Editor';
import { getElementKey } from './EditorElement';

type ChildrenProps = {
  pathChildren: *,
  activePath: Path,
};

class Children extends React.PureComponent<ChildrenProps> {
  getChildPath(child) {
    const index = this.props.pathChildren.findIndex(item => item === child);
    return this.props.activePath.concat(index);
  }

  renderChildren(elementChildren) {
    return elementChildren.map((child, index) => (
      <React.Fragment key={getElementKey(child)}>
        {index !== 0 && <EditorMenuSeparator type="sibling" />}
        <EditorMenuButton path={this.getChildPath(child)}>
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

type PathButtonsProps = {
  activePath: Path,
  elements: *,
};

class PathButtons extends React.PureComponent<PathButtonsProps> {
  render() {
    const { activePath, elements } = this.props;
    let pathChildren = elements;
    let stringFound = false;
    let buttonPath = [];

    const buttons = activePath.reduce((buttons, pathIndex, index) => {
      const child = pathChildren[pathIndex];
      // Written like this because of Flow type refinements.
      if (stringFound || typeof child === 'string') {
        stringFound = true;
        return buttons;
      }
      pathChildren = child.props.children;
      const key = getElementKey(child);
      // Enforce autoFocus via activePath. Remember autoFocus uses identity.
      const autoFocus = index === activePath.length - 1 && activePath;
      buttonPath = buttonPath.concat(pathIndex);
      return [
        ...buttons,
        <React.Fragment key={key}>
          <EditorMenuSeparator />
          <EditorMenuButton autoFocus={autoFocus} path={buttonPath}>
            {child.type}
          </EditorMenuButton>
        </React.Fragment>,
      ];
    }, []);

    return [
      ...buttons,
      <Children
        key="children"
        pathChildren={pathChildren}
        activePath={activePath}
      />,
    ];
  }
}

type EditorMenuBreadcrumbsProps = {|
  activePath: Path,
  pageName: string,
  web: Web,
  webName: string,
|};

class EditorMenuBreadcrumbs extends React.PureComponent<
  EditorMenuBreadcrumbsProps,
> {
  render() {
    const { activePath, pageName, web, webName } = this.props;
    return (
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" flexWrap="wrap">
          <EditorMenuButton autoFocus section="web">
            {webName}
          </EditorMenuButton>
          <EditorMenuSeparator />
          <EditorMenuButton section="page">{pageName}</EditorMenuButton>
          <PathButtons activePath={activePath} elements={web.pages[pageName]} />
        </Box>
        <EditorMenuButton flexDirection="row" section="hamburger">
          ☰
        </EditorMenuButton>
      </Box>
    );
  }
}

export default EditorMenuBreadcrumbs;
