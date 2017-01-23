// @flow
import type { State } from '../../common/types';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import color from 'color';
import { Box, Button, Text } from '../../common/components';
import { Platform, StyleSheet } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

type HeaderProps = {
  appShowMenu: typeof appShowMenu,
  menuShown: boolean,
  title: string,
};

// iOS status bar is an overlay with default height 20px. We add one baseline
// to preserve the vertical rhythm. We also set height to ensure hairline
// border height (various) is included.
const platformStyles = () => Platform.OS === 'ios' ? {
  paddingTop: 1,
  height: 3,
} : {
  height: 2,
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
      // backgroundColor="danger" // To test.
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
    {...platformStyles()}
    backgroundColor="primary"
    flexDirection="row"
    alignItems="center"
    style={theme => ({
      borderBottomColor: color(theme.colors.primary).lighten(0.2).string(),
      borderBottomWidth: StyleSheet.hairlineWidth,
    })}
  >
    <HeaderButton onPress={() => appShowMenu(!menuShown)}>
      <HeaderIcon name="ios-menu" />
    </HeaderButton>
    <Text color="white" size={1}>
      {title}
    </Text>
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
