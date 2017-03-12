// @flow
import type { State } from '../../common/types';
import Box from './Box';
import Button from './Button';
import React from 'react';
import Text from './Text';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setTheme } from '../app/actions';

type SwitchThemeProps = {
  currentTheme: string,
  setTheme: typeof setTheme,
  themes: { [themeName: string]: Object },
};

const getSortedThemeNames = themes => [
  'defaultTheme',
  ...Object.keys(themes).filter(key => key !== 'defaultTheme').sort(),
];

// This is just an example, but themes are useful. We can implement day / night
// mode, or have web mobile, iOS, Android, whatever custom looks.

const SwitchTheme = (
  {
    currentTheme,
    setTheme,
    themes,
  }: SwitchThemeProps,
) => (
  <Box>
    <Text bold>
      Switch Theme
    </Text>
    <Box
      alignItems="center"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="flex-start"
      marginHorizontal={-0.25}
    >
      {getSortedThemeNames(themes).map(themeName => (
        <Button
          primary
          outline={themeName !== currentTheme}
          size={-1}
          marginHorizontal={0.25}
          onPress={() => setTheme(themeName)}
          key={themeName}
        >
          {themeName.replace('Theme', '')}
        </Button>
      ))}
    </Box>
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      currentTheme: state.app.currentTheme,
    }),
    { setTheme },
  ),
)(SwitchTheme);
