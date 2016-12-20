/* @flow */
import type { State } from '../../common/types';
import * as themes from '../app/themes';
import compose from 'ramda/src/compose';
import React from 'react';
import { Box, Button } from '../app/components';
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
  <Box>
    {themesNames.map(themeName => (
      <Button
        key={themeName}
        marginHorizontal="0.5em"
        // marginLeft={i && '.75em'}
        // backgroundColor="warning"
        // onClick={() => setTheme(themeName)}
        backgroundColor={themeName === currentTheme ? 'success' : 'primary'}
      >
        {themeName.replace('Theme', '')}
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
