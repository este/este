// @flow
import * as React from 'react';
import type { Web } from './Editor';
import Box from './Box';
import Text from './Text';
import Button, { type ButtonProps } from './Button';
import EditorMenuHamburger from './EditorMenuHamburger';

type EditorMenuProps = {
  web: Web,
  webName: string,
  pageName: string,
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

const Arrow = () => <Text paddingHorizontal={0.5}>▸</Text>;

// const Circle = () => <Text paddingHorizontal={0.5}>•</Text>;

const Breadcrumbs = ({ webName, pageName }) => (
  <Box flexDirection="row">
    <EditorMenuButton>{webName}</EditorMenuButton>
    <Arrow />
    <EditorMenuButton>{pageName}</EditorMenuButton>
    {/* <Circle />
    <EditorMenuButton>publish</EditorMenuButton> */}
  </Box>
);

// const Hide = props => <Button {...props}>&times;</Button>;

class EditorMenu extends React.Component<EditorMenuProps, EditorMenuState> {
  state = initialState;

  render() {
    const { webName, pageName } = this.props;

    return (
      <Box
        backgroundColor="black"
        paddingVertical={0.5}
        paddingHorizontal={0.5}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        style={{ boxShadow: '0 0 13px 2px rgba(0,0,0,0.3)' }}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Breadcrumbs webName={webName} pageName={pageName} />
        <EditorMenuHamburger />
      </Box>
    );
  }
}

export default EditorMenu;
