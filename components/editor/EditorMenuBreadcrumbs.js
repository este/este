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

type ChildrenProps = {
  pathChildren: *,
  dispatch: EditorDispatch,
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

  handleToggleOnPress = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChildrenButtonOnPress = child => () => {
    const index = this.props.pathChildren.findIndex(item => item === child);
    const path = this.props.activePath.concat(index);
    this.props.dispatch({ type: 'SET_ACTIVE_PATH', path });
  };

  renderElementChildren(elementChildren) {
    return elementChildren.map((child, index) => (
      <React.Fragment key={getElementKey(child)}>
        {index <= elementChildren.length - 1 && (
          <Separator type={index === 0 ? 'arrow' : 'circle'} />
        )}
        <EditorMenuButton
          autoFocus={index === 0}
          onPress={this.handleChildrenButtonOnPress(child)}
        >
          {child.type}
        </EditorMenuButton>
      </React.Fragment>
    ));
  }

  render() {
    const elementChildren = this.props.pathChildren.filter(
      item => typeof item !== 'string',
    );
    if (elementChildren.length === 0) return null;

    return (
      <React.Fragment>
        <Separator />
        <EditorMenuButton onPress={this.handleToggleOnPress}>
          …
        </EditorMenuButton>
        {this.state.expanded && this.renderElementChildren(elementChildren)}
      </React.Fragment>
    );
  }
}

const PathButtons = ({ activePath, elements, dispatch }) => {
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

  return [
    ...buttons,
    <Children
      key="children"
      dispatch={dispatch}
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
        />
      </Box>
      <EditorMenuButton flexDirection="row" {...button('hamburger')}>
        ☰
      </EditorMenuButton>
    </Box>
  );
};

export default EditorMenuBreadcrumbs;
