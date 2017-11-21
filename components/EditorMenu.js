// @flow
import * as React from 'react';
import type { Web } from './Editor';
import Box from './Box';
import Text from './Text';
import GenericButton from './Button';
import Set from './Set';

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

const Button = props => (
  <GenericButton
    paddingVertical={0}
    marginVertical={0}
    paddingHorizontal={0}
    {...props}
  />
);

const Arrow = () => <Text paddingHorizontal={0.5}>▸</Text>;

// const Circle = () => <Text paddingHorizontal={0.5}>•</Text>;

const Breadcrumbs = ({ webName, pageName }) => (
  <Box flexDirection="row">
    <Button>{webName}</Button>
    <Arrow />
    <Button>{pageName}</Button>
    {/* <Circle />
    <Button>publish</Button> */}
  </Box>
);

// const Hide = props => <Button {...props}>&times;</Button>;

const HamburgerButton = props => <Button {...props}>☰</Button>;

const Hamburger = () => (
  <Set marginBottom={0} paddingLeft={1}>
    <HamburgerButton
      onPress={() => {
        // eslint-disable-next-line no-alert, no-undef
        alert('not yet');
      }}
    />
  </Set>
);

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
        <Hamburger />
      </Box>
    );
  }
}

export default EditorMenu;
