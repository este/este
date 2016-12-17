/* @flow */
import type { State } from '../../common/types';
import * as themes from '../app/themes';
import compose from 'ramda/src/compose';
import React from 'react';
import { Box, Button, Heading } from '../app/components';
import { connect } from 'react-redux';
import { setTheme } from '../../common/themes/actions';

type SwitchThemeProps = {
  currentTheme: string,
  setTheme: typeof setTheme, // This is so good. Flowtype ftw.
};

const getSortedThemeKeysWithDefaultAsFirst = () => {
  const customThemesKeys = Object
    .keys(themes)
    .filter(key => key !== 'defaultTheme')
    .sort();
  return ['defaultTheme', ...customThemesKeys];
};

const SwitchTheme = ({ currentTheme, setTheme }: SwitchThemeProps) => (
  <Box marginTop="medium">
    <Heading>Theme Switcher</Heading>
    {getSortedThemeKeysWithDefaultAsFirst().map((themeKey, i) => (
      <Button
        key={themeKey}
        marginLeft={i === 0 ? 'step0' : 'step1'}
        // backgroundColor="warning"
        // mr={1}
        // onClick={() => setTheme(themeKey)}
        // theme={themeKey === currentTheme ? 'primary' : 'secondary'}
      >
        {themeKey.replace('Theme', ' theme')}
      </Button>
    ))}
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      currentTheme: state.themes.currentTheme || 'defaultTheme',
    }),
    { setTheme },
  ),
)(SwitchTheme);
