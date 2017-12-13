// @flow
import * as React from 'react';
import type { Web, Path, EditorDispatch, SectionName } from './Editor';
import Box from '../Box';
import Button, { type ButtonProps } from '../Button';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import Text from '../Text';
import Set, { type SetProps } from '../Set';
import maybeMoveFocusOnKey from '../../lib/maybeMoveFocusOnKey';

import EditorMenuSectionHamburger from './EditorMenuSectionHamburger';
import EditorMenuSectionWeb from './EditorMenuSectionWeb';
import EditorMenuSectionPage from './EditorMenuSectionPage';
import EditorMenuSectionElement from './EditorMenuSectionElement';

type EditorMenuProps = {|
  activePath: Path,
  activeSection: SectionName,
  dispatch: EditorDispatch,
  onHeightChange: (menu: HTMLElement) => void,
  pageName: string,
  web: Web,
  webName: string,
|};

type EditorMenuButtonProps = { active?: boolean } & ButtonProps;

// It's used at multiple places because of fixBrowserFontSmoothing.
const backgroundColor = 'black';

// TODO: Probably layout props: buttons and content.
export const Section = (props: SetProps) => {
  const { marginBottom = 0, paddingTop = 0.5, ...restProps } = props;
  return (
    <Set marginBottom={marginBottom} paddingTop={paddingTop} {...restProps} />
  );
};

const sections = {
  hamburger: EditorMenuSectionHamburger,
  web: EditorMenuSectionWeb,
  page: EditorMenuSectionPage,
  element: EditorMenuSectionElement,
};

export const EditorMenuButton = (props: EditorMenuButtonProps) => {
  const {
    active,
    paddingVertical = 0,
    marginVertical = 0,
    paddingHorizontal = 0.25,
    ...restProps
  } = props;
  return (
    <Button
      backgroundColor={backgroundColor} // because fixBrowserFontSmoothing
      decoration={active ? 'underline' : 'none'}
      paddingVertical={paddingVertical}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      {...restProps}
    />
  );
};

type SeparatorProps = {|
  type?: 'arrow' | 'circle' | 'empty',
|};

export const Separator = ({ type }: SeparatorProps) => (
  <Text backgroundColor="black" marginHorizontal={0.25}>
    {{ arrow: '▸', circle: '•', empty: '\xa0' }[type || 'arrow']}
  </Text>
);

const menuPaddingVertical = 0.5;

export const getDefaultMenuHeight = (lineHeight: number) =>
  lineHeight + 2 * (menuPaddingVertical * lineHeight);

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
    // eslint-disable-next-line react/no-find-dom-node
    const node = ((ReactDOM.findDOMNode(this): any): HTMLElement);
    this.resizeObserver = new ResizeObserver(() => {
      this.props.onHeightChange(node);
    });
    this.resizeObserver.observe(node);
  }

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    maybeMoveFocusOnKey(event.key, event.currentTarget, event.target);
  };

  render() {
    const {
      activePath,
      activeSection,
      dispatch,
      pageName,
      web,
      webName,
    } = this.props;
    const ActiveSection = sections[activeSection];

    return (
      <Box
        backgroundColor={backgroundColor}
        bottom={0}
        left={0}
        paddingHorizontal={0.5}
        paddingVertical={menuPaddingVertical}
        right={0}
        style={EditorMenu.style}
        onKeyDown={this.handleKeyDown}
      >
        <EditorMenuBreadcrumbs
          activePath={activePath}
          activeSection={activeSection}
          dispatch={dispatch}
          pageName={pageName}
          web={web}
          webName={webName}
        />
        <ActiveSection
        // activePath={activePath}
        // dispatch={dispatch}
        // pageName={pageName}
        // web={web}
        />
      </Box>
    );
  }
}

export default EditorMenu;
