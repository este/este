// @flow
import type { State } from '../../common/types';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Platform } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';
import { Box, Button, Text } from '../../common/components';

//     borderBottomColor: theme.bright(theme.brandPrimary),
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     paddingBottom: theme.fontSize * 0.625,
//     paddingTop: (theme.fontSize * 0.625) + paddingTopOffset,

type HeaderProps = {
  appShowMenu: typeof appShowMenu,
  menuShown: boolean,
  title: string,
};

const maybePaddingTopForIos = () => {
  if (Platform.OS !== 'ios') return 0;
  // iOS status bar is an overlay with default height 20px.
  // Let's add one lineHeight line to preserve the vertical rhythm.
  return 1;
};

const HeaderButton = ({
  right,
  ...props
}) => (
  <Box
    alignSelf="stretch"
    flex={1}
    flexDirection="row"
    justifyContent={right ? 'flex-end' : 'flex-start'}
  >
    <Button
      // backgroundColor="danger"
      color="white"
      flexDirection="column"
      paddingHorizontal={0.5}
      {...props}
    />
  </Box>
);

const HeaderIcon = (props) => (
  <Text
    as={Icon}
    color="white"
    size={1}
    {...props}
  />
);

const Header = ({
  appShowMenu,
  menuShown,
  title,
}: HeaderProps) => (
  <Box
    backgroundColor="primary"
    flexDirection="row"
    paddingTop={maybePaddingTopForIos()}
  >
    <HeaderButton onPress={() => appShowMenu(!menuShown)}>
      <HeaderIcon name="ios-menu" />
    </HeaderButton>
    <Text
      color="white"
      paddingVertical={0.5}
      size={1}
    >{title}</Text>
    <HeaderButton right>
      {/* A placeholder for the right side button. */}
      {/* <HeaderIcon name="ios-menu" /> */}
      {/* Foo */}
    </HeaderButton>
  </Box>
);

export default connect(
  (state: State) => ({
    menuShown: state.app.menuShown,
  }),
  { appShowMenu },
)(Header);
