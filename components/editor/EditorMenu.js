// @flow
import * as React from 'react';
import type { Path, Web } from './Editor';
import Box from '../Box';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import { RovingTabIndexProvider } from '../RovingTabIndex';
import EditorMenuActiveSection from './EditorMenuActiveSection';

export type SectionName =
  | 'hamburger'
  | 'web'
  | 'page'
  | 'element'
  | 'theme'
  | 'typography'
  | 'add';

// It's used at multiple places because of fixBrowserFontSmoothing.
export const backgroundColor = 'black';

export const menuPadding = 0.25;

export const editorMenuItemProps = {
  backgroundColor,
  marginVertical: menuPadding,
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
      <RovingTabIndexProvider>
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
          <EditorMenuActiveSection
            activeSection={activeSection}
            web={web}
            activePath={activePath}
          />
        </Box>
      </RovingTabIndexProvider>
    );
  }
}

export default EditorMenu;
