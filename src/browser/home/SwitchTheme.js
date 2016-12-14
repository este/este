/* @flow */
import type { State } from '../../common/types';
import * as themes from '../app/themes';
import R from 'ramda';
import React from 'react';
import { Box, Button } from '../app/components';
import { connect } from 'react-redux';
import { setTheme } from '../../common/themes/actions';

type SwitchThemeProps = {
  currentTheme: string,
  setTheme: typeof setTheme, // This is so good. Flowtype ftw.
};

const getSortedThemeKeysWithDefaultAsFirst = () => {
  const customThemesKeys = Object.keys(themes)
    .filter(key => key !== 'defaultTheme')
    .sort();
  return ['defaultTheme', ...customThemesKeys];
};

const SwitchTheme = ({ currentTheme, setTheme }: SwitchThemeProps) => (
  <Box>
    {getSortedThemeKeysWithDefaultAsFirst().map(themeKey => (
      <Button
        size="small"
        key={themeKey}
        // backgroundColor="warning"
        // mr={1}
        // onClick={() => setTheme(themeKey)}
        // theme={themeKey === currentTheme ? 'primary' : 'secondary'}
      >
        {themeKey}
      </Button>
    ))}
  </Box>
);

export default R.compose(
  connect(
    (state: State) => ({
      currentTheme: state.themes.currentTheme || 'defaultTheme',
    }),
    { setTheme },
  ),
)(SwitchTheme);
