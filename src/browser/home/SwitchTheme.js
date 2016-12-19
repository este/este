/* @flow */
import type { State } from '../../common/types';
import * as themes from '../app/themes';
import R from 'ramda';
import React from 'react';
import { Box, Button, Heading } from '../app/components';
import { connect } from 'react-redux';
import { setTheme } from '../../common/themes/actions';

type SwitchThemeProps = {
  currentTheme: string,
  setTheme: typeof setTheme, // This is so good. Flowtype ftw.
};

const themesNames = [
  'defaultTheme',
  ...Object
    .keys(themes)
    .filter(key => key !== 'defaultTheme')
    .sort()
];

const SwitchTheme = ({ currentTheme, setTheme }: SwitchThemeProps) => (
  <Box marginBottom={0.5}>
    <Heading marginBottom={0.5}>Switch Theme</Heading>
    {themesNames.map((themeName, i) => (
      <Button
        key={themeName}
        marginLeft={i && '.75em'}
        // backgroundColor="warning"
        // onClick={() => setTheme(themeName)}
        backgroundColor={themeName === currentTheme ? 'success' : 'primary'}
      >
        {themeName.replace('Theme', ' theme')}
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
