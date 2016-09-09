/* @flow */
import * as themes from '../themes';
import React from 'react';
import { Button, View } from './';
import { connect } from 'react-redux';
import { setTheme } from '../../../common/themes/actions';

const getSortedThemeKeys = () => {
  const customThemesKeys = Object.keys(themes)
    .filter(key => key !== 'initial')
    .sort();
  return ['initial', ...customThemesKeys];
};

const SwitchTheme = ({ currentTheme, setTheme }) => (
  <View>
    {getSortedThemeKeys().map(themeKey =>
      <Button
        key={themeKey}
        mr={1}
        onClick={() => setTheme(themeKey)}
        theme={themeKey === currentTheme ? 'primary' : 'secondary'}
      >
        {themeKey} theme
      </Button>
    )}
  </View>
);

SwitchTheme.propTypes = {
  currentTheme: React.PropTypes.string,
  setTheme: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  currentTheme: state.themes.currentTheme || 'initial',
}), { setTheme })(SwitchTheme);
