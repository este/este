// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Box from './Box';
import Button, { type ButtonProps } from './Button';
import EditorMenuHamburger from './EditorMenuHamburger';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';
import ResizeObserver from 'resize-observer-polyfill';
import ReactDOM from 'react-dom';

type EditorMenuProps = {|
  web: Web,
  webName: string,
  pageName: string,
  activePath: Path,
  onHeightChange: (menu: HTMLElement) => void,
|};

const backgroundColor = 'black';

export const EditorMenuButton = (props: ButtonProps) => {
  const {
    paddingVertical = 0,
    marginVertical = 0,
    paddingHorizontal = 0.25,
    ...restProps
  } = props;
  return (
    <Button
      backgroundColor={backgroundColor} // because fixBrowserFontSmoothing
      paddingVertical={paddingVertical}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      {...restProps}
    />
  );
};

const paddingVertical = 0.5;

export const getDefaultMenuHeight = (lineHeight: number) =>
  lineHeight + 2 * (paddingVertical * lineHeight);

class EditorMenu extends React.Component<EditorMenuProps> {
  static style = {
    position: 'fixed',
    boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)',
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ((ReactDOM.findDOMNode(this): any): HTMLElement);
    this.resizeObserver = new ResizeObserver(() => {
      this.props.onHeightChange(node);
    });
    this.resizeObserver.observe(node);
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect();
  }

  resizeObserver: ResizeObserver;

  render() {
    const { web, webName, pageName, activePath } = this.props;

    return (
      <Box
        backgroundColor={backgroundColor}
        paddingVertical={paddingVertical}
        paddingHorizontal={0.5}
        bottom={0}
        left={0}
        right={0}
        style={EditorMenu.style}
        flexDirection="row"
        justifyContent="space-between"
      >
        <EditorMenuBreadcrumbs
          web={web}
          webName={webName}
          pageName={pageName}
          activePath={activePath}
        />
        <EditorMenuHamburger />
      </Box>
    );
  }
}

export default EditorMenu;
