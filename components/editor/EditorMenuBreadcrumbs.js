// @flow
import * as React from 'react';
import Box from '../Box';
import { EditorMenuButton, Separator } from './EditorMenu';
import type { Web, Path, EditorDispatch, SectionName } from './Editor';
import { getElementKey } from './EditorElement';
import { pathEqual } from './Editor';

type EditorMenuBreadcrumbsProps = {|
  activePath: Path,
  activeSection: SectionName,
  dispatch: EditorDispatch,
  pageName: string,
  web: Web,
  webName: string,
|};

type ChildrenProps = {
  pathChildren: *,
  handleOnPress: *,
  activePath: Path,
};

type ChildrenState = {
  expanded: boolean,
};

class Children extends React.Component<ChildrenProps, ChildrenState> {
  state = { expanded: false };

  componentWillReceiveProps(nextProps: ChildrenProps) {
    if (nextProps.pathChildren !== this.props.pathChildren)
      this.setState({ expanded: false });
  }

  getChildPath(child) {
    const index = this.props.pathChildren.findIndex(item => item === child);
    return this.props.activePath.concat(index);
  }

  handleToggleOnPress = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChildrenButtonOnPress = child => () => {
    const path = this.getChildPath(child);
    this.props.handleOnPress(path)();
  };

  renderElementChildren(
    elementChildren,
    {
      separatorType = 'circle',
      autoFocusFirst = false,
    }: {|
      separatorType?: *,
      autoFocusFirst?: *,
    |},
  ) {
    return elementChildren.map((child, index) => (
      <React.Fragment key={getElementKey(child)}>
        <Separator type={separatorType} />
        <EditorMenuButton
          autoFocus={autoFocusFirst && index === 0}
          onPress={this.handleChildrenButtonOnPress(child)}
        >
          {child.type}
        </EditorMenuButton>
      </React.Fragment>
    ));
  }

  renderChildren(children) {
    if (children.length === 0) return null;

    return (
      <React.Fragment>
        {this.state.expanded ? (
          this.renderElementChildren(children, {
            autoFocusFirst: true,
            separatorType: 'empty',
          })
        ) : (
          <React.Fragment>
            <Separator type="empty" />
            <EditorMenuButton onPress={this.handleToggleOnPress}>
              …
            </EditorMenuButton>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  render() {
    // Render only elements, not strings.
    const elementChildren = this.props.pathChildren.filter(
      item => typeof item !== 'string',
    );
    if (elementChildren.length === 0) return null;

    const [firstElementChildren, ...restElementChildren] = elementChildren;

    return (
      <React.Fragment>
        {this.renderElementChildren([firstElementChildren], {
          separatorType: 'arrow',
        })}
        {this.renderChildren(restElementChildren)}
      </React.Fragment>
    );
  }
}

const PathButtons = ({ activePath, elements, dispatch, button }) => {
  let pathChildren = elements;
  let stringFound = false;
  let buttonPath = [];

  const handleOnPress = path => () =>
    dispatch({ type: 'SET_ACTIVE_PATH', path });

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
    const active = button.active && pathEqual(activePath, buttonPath);
    return [
      ...buttons,
      <React.Fragment key={key}>
        <Separator />
        <EditorMenuButton
          active={active}
          autoFocus={isLast ? activePath : false}
          onPress={handleOnPress(buttonPath)}
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
      handleOnPress={handleOnPress}
      pathChildren={pathChildren}
      activePath={activePath}
    />,
  ];
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
          button={button('element')}
        />
      </Box>
      <EditorMenuButton flexDirection="row" {...button('hamburger')}>
        ☰
      </EditorMenuButton>
    </Box>
  );
};

export default EditorMenuBreadcrumbs;
