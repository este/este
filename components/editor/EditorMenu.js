// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Box from '../Box';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import A, { type AProps } from '../A';
import Set, { type SetProps } from '../Set';
import Text, { type TextProps } from '../Text';
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

// It's used at multiple places because of fixBrowserFontSmoothing.
export const backgroundColor = 'black';

export const menuPadding = 0.25;

export const editorMenuItemProps = {
  backgroundColor,
  marginVertical: menuPadding,
};

export const EditorMenuA = (props: AProps) => (
  <RovingTabIndex.Consumer>
    {(tabIndex, onFocus, onKeyDown) => (
      <A
        {...editorMenuItemProps}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        {...props}
      />
    )}
  </RovingTabIndex.Consumer>
);

const sections = {
  hamburger: EditorMenuSectionHamburger,
  web: EditorMenuSectionWeb,
  page: EditorMenuSectionPage,
  element: EditorMenuSectionElement,
  theme: EditorMenuSectionTheme,
  typography: EditorMenuSectionTypography,
};

export type SectionName = $Keys<typeof sections>;

export const EditorMenuSection = (props: SetProps) => {
  const { marginBottom = 0, ...restProps } = props;
  return <Set marginBottom={marginBottom} {...restProps} />;
};

export const EditorMenuText = (props: TextProps) => (
  <Text {...editorMenuItemProps} {...props} />
);

type EditorMenuSeparatorProps = {|
  type?: 'descendant' | 'sibling',
|};

export const EditorMenuSeparator = (props: EditorMenuSeparatorProps) => {
  const { type = 'descendant' } = props;
  return (
    <Text
      {...editorMenuItemProps}
      color="gray"
      marginVertical={menuPadding}
      marginHorizontal={0.25}
    >
      {{ descendant: '▸', sibling: '•' }[type]}
    </Text>
  );
};

type EditorMenuProps = {|
  activePath: Path,
  activeSection: SectionName,
  onHeightChange: (menu: HTMLElement) => void,
  pageName: string,
  web: Web,
  webName: string,
|};

class EditorMenu extends React.Component<EditorMenuProps> {
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
    const ActiveSection = sections[activeSection];

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
            activePath={activePath}
            pageName={pageName}
            web={web}
            webName={webName}
          />
          <ActiveSection web={web} />
        </Box>
      </RovingTabIndex.Provider>
    );
  }
}

export default EditorMenu;
