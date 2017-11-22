// @flow
import * as React from 'react';
// import type { Web } from './Editor';
import Box from './Box';
import Button, { type ButtonProps } from './Button';
import EditorMenuHamburger from './EditorMenuHamburger';
import EditorMenuBreadcrumbs from './EditorMenuBreadcrumbs';

type EditorMenuProps = {
  // web: Web,
  webName: string,
  pageName: string,
  paddingVertical: number,
};

type EditorMenuState = {
  shown: boolean,
};

const initialState = {
  shown: true,
};

export const EditorMenuButton = (props: ButtonProps) => {
  const {
    paddingVertical = 0,
    marginVertical = 0,
    paddingHorizontal = 0,
    ...restProps
  } = props;
  return (
    <Button
      paddingVertical={paddingVertical}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      {...restProps}
    />
  );
};

// const Hide = props => <Button {...props}>&times;</Button>;

class EditorMenu extends React.PureComponent<EditorMenuProps, EditorMenuState> {
  state = initialState;

  render() {
    const { webName, pageName, paddingVertical } = this.props;

    return (
      <Box
        backgroundColor="black"
        paddingVertical={paddingVertical}
        paddingHorizontal={0.5}
        bottom={0}
        left={0}
        right={0}
        style={{ position: 'fixed', boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)' }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <EditorMenuBreadcrumbs webName={webName} pageName={pageName} />
        <EditorMenuHamburger />
      </Box>
    );
  }
}

export default EditorMenu;
