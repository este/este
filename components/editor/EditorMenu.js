// @flow
import * as React from 'react';
import * as Editor from './Editor';
import Box from '../Box';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import * as RovingTabIndex from '../RovingTabIndex';
import EditorDispatch from './EditorDispatch';

import EditorMenuSectionHamburger from './EditorMenuSectionHamburger';
import EditorMenuSectionWeb from './EditorMenuSectionWeb';
import EditorMenuSectionPage from './EditorMenuSectionPage';
import EditorMenuSectionElement from './EditorMenuSectionElement';
import EditorMenuSectionTheme from './EditorMenuSectionTheme';
import EditorMenuSectionTypography from './EditorMenuSectionTypography';
import EditorMenuSectionAdd from './EditorMenuSectionAdd';

export { default as EditorMenuButton } from './EditorMenuButton';
export { default as EditorMenuInput } from './EditorMenuInput';
export { default as EditorMenuInputs } from './EditorMenuInputs';
export { default as EditorMenuA } from './EditorMenuA';
export { default as EditorMenuSection } from './EditorMenuSection';
export { default as EditorMenuText } from './EditorMenuText';
export { default as EditorMenuSeparator } from './EditorMenuSeparator';

// It's used at multiple places because of fixBrowserFontSmoothing.
export const backgroundColor = 'black';

export const menuPadding = 0.25;

export const editorMenuItemProps = {
  backgroundColor,
  marginVertical: menuPadding,
};

export type SectionName =
  | 'hamburger'
  | 'web'
  | 'page'
  | 'element'
  | 'theme'
  | 'typography'
  | 'add';

type ActiveSectionProps = {
  activeSection: SectionName,
  activePath: Editor.Path,
  web: Editor.Web,
  dispatch: Editor.EditorDispatch,
};

// I tried sections object with $Keys, but it wasn't type safe. Explicit ftw.
const ActiveSection = ({
  activeSection,
  activePath,
  web,
  dispatch,
}: ActiveSectionProps) => {
  switch (activeSection) {
    case 'hamburger':
      return <EditorMenuSectionHamburger />;
    case 'web':
      return <EditorMenuSectionWeb />;
    case 'page':
      return <EditorMenuSectionPage />;
    case 'element':
      return (
        <EditorMenuSectionElement activePath={activePath} dispatch={dispatch} />
      );
    case 'theme':
      return <EditorMenuSectionTheme />;
    case 'typography':
      return <EditorMenuSectionTypography web={web} dispatch={dispatch} />;
    case 'add':
      return <EditorMenuSectionAdd activePath={activePath} />;
    default:
      // eslint-disable-next-line no-unused-expressions
      (activeSection: empty);
      return null;
  }
};

type EditorMenuProps = {|
  activePath: Editor.Path,
  activeSection: SectionName,
  onHeightChange: (menu: HTMLElement) => void,
  pageName: string,
  web: Editor.Web,
  webName: string,
|};

class EditorMenu extends React.PureComponent<EditorMenuProps> {
  static style = {
    position: 'fixed',
    boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)',
  };

  componentDidMount() {
    this.observeMenuSize();
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect();
  }

  resizeObserver: ResizeObserver;

  observeMenuSize() {
    // Type casting through any, because we know it is an element.
    // eslint-disable-next-line react/no-find-dom-node
    const element = ((ReactDOM.findDOMNode(this): any): HTMLElement);
    this.resizeObserver = new ResizeObserver(() => {
      this.props.onHeightChange(element);
    });
    this.resizeObserver.observe(element);
  }

  render() {
    const { activePath, activeSection, pageName, web, webName } = this.props;

    return (
      <RovingTabIndex.Provider>
        <Box
          backgroundColor={backgroundColor}
          bottom={0}
          left={0}
          paddingHorizontal={0.5}
          paddingVertical={menuPadding}
          right={0}
          style={EditorMenu.style}
        >
          <EditorMenuBreadcrumbs
            activeSection={activeSection}
            activePath={activePath}
            pageName={pageName}
            web={web}
            webName={webName}
          />
          <EditorDispatch>
            {dispatch => (
              <ActiveSection
                activeSection={activeSection}
                web={web}
                activePath={activePath}
                dispatch={dispatch}
              />
            )}
          </EditorDispatch>
        </Box>
      </RovingTabIndex.Provider>
    );
  }
}

export default EditorMenu;
