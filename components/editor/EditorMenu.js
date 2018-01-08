// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Box from '../Box';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import * as RovingTabIndex from '../RovingTabIndex';

import EditorMenuSectionHamburger from './EditorMenuSectionHamburger';
import EditorMenuSectionWeb from './EditorMenuSectionWeb';
import EditorMenuSectionPage from './EditorMenuSectionPage';
import EditorMenuSectionElement from './EditorMenuSectionElement';
import EditorMenuSectionTheme from './EditorMenuSectionTheme';
import EditorMenuSectionTypography from './EditorMenuSectionTypography';

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
  | 'typography';

type ActiveSectionProps = {
  activeSection: SectionName,
  web: Web,
};

// I tried sections object with $Keys, but it wasn't type safe. Explicit ftw.
const ActiveSection = ({ activeSection, web }: ActiveSectionProps) => {
  switch (activeSection) {
    case 'hamburger':
      return <EditorMenuSectionHamburger />;
    case 'web':
      return <EditorMenuSectionWeb />;
    case 'page':
      return <EditorMenuSectionPage />;
    case 'element':
      return <EditorMenuSectionElement web={web} />;
    case 'theme':
      return <EditorMenuSectionTheme />;
    case 'typography':
      return <EditorMenuSectionTypography web={web} />;
    default:
      // eslint-disable-next-line no-unused-expressions
      (activeSection: empty);
      return null;
  }
};

type EditorMenuProps = {|
  activePath: Path,
  activeSection: SectionName,
  onHeightChange: (menu: HTMLElement) => void,
  pageName: string,
  web: Web,
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
          <ActiveSection activeSection={activeSection} web={web} />
        </Box>
      </RovingTabIndex.Provider>
    );
  }
}

export default EditorMenu;
