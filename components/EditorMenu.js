// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Box from './Box';
import Button, { type ButtonProps } from './Button';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';
import Text from './Text';
import EditorMenuSectionHamburger from './EditorMenuSectionHamburger';

type EditorMenuProps = {|
  web: Web,
  webName: string,
  pageName: string,
  activePath: Path,
  onHeightChange: (menu: HTMLElement) => void,
|};

export type Section = 'hamburger';

type EditorMenuState = {|
  shownSection: ?Section,
|};

type EditorMenuButtonProps = { active?: boolean } & ButtonProps;

// It's used at multiple places because of fixBrowserFontSmoothing.
const backgroundColor = 'black';

const sections = {
  hamburger: EditorMenuSectionHamburger,
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
      opacity={active ? 0.5 : 1}
      paddingVertical={paddingVertical}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      {...restProps}
    />
  );
};

export const Separator = ({ circle }: { circle?: boolean }) => (
  <Text backgroundColor="black" marginHorizontal={0.25}>
    {circle ? '•' : '▸'}
  </Text>
);

const menuPaddingVertical = 0.5;

export const getDefaultMenuHeight = (lineHeight: number) =>
  lineHeight + 2 * (menuPaddingVertical * lineHeight);

class EditorMenu extends React.Component<EditorMenuProps, EditorMenuState> {
  static style = {
    position: 'fixed',
    boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)',
  };

  state = {
    shownSection: null,
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

  handleEditorMenuBreadcrumbsSelectSection = (section: Section) => {
    this.setState(state => ({
      shownSection: state.shownSection !== section ? section : null,
    }));
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
    if (event.key === 'Escape') {
      this.setState({ shownSection: null });
    }
  };

  render() {
    const { web, webName, pageName, activePath } = this.props;
    const { shownSection } = this.state;
    const Section = shownSection && sections[shownSection];

    return (
      <Box
        backgroundColor={backgroundColor}
        paddingVertical={menuPaddingVertical}
        paddingHorizontal={0.5}
        bottom={0}
        left={0}
        right={0}
        style={EditorMenu.style}
        onKeyDown={this.handleKeyDown}
      >
        <EditorMenuBreadcrumbs
          web={web}
          webName={webName}
          pageName={pageName}
          activePath={activePath}
          onSelectSection={this.handleEditorMenuBreadcrumbsSelectSection}
          shownSection={shownSection}
        />
        {Section && (
          <Box paddingTop={0.5}>
            <Section />
          </Box>
        )}
      </Box>
    );
  }
}

export default EditorMenu;
