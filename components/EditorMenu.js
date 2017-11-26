// @flow
import * as React from 'react';
import type { Web, Path } from './Editor';
import Box from './Box';
import Button, { type ButtonProps } from './Button';
import EditorMenuHamburger from './EditorMenuHamburger';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';

type EditorMenuProps = {
  web: Web,
  webName: string,
  pageName: string,
  paddingVertical: number,
  activePath: Path,
};

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

const styles = {
  box: { position: 'fixed', boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)' },
};

const EditorMenu = ({
  web,
  webName,
  pageName,
  paddingVertical,
  activePath,
}: EditorMenuProps) => (
  <Box
    backgroundColor={backgroundColor}
    paddingVertical={paddingVertical}
    paddingHorizontal={0.5}
    bottom={0}
    left={0}
    right={0}
    style={styles.box}
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

export default EditorMenu;
