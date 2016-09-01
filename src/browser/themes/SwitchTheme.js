/* @flow */
import * as themes from '../app/themes';
import React from 'react';
import { Button, Space } from '../app/components';
import { connect } from 'react-redux';
import { setTheme } from '../../common/themes/actions';

const getSortedThemeKeys = () => {
  const customThemesKeys = Object
    .keys(themes)
    .filter(key => key !== 'initial')
    .sort();
  return ['initial', ...customThemesKeys];
};

const SwitchTheme = ({ currentTheme, setTheme }) => (
  <div>
    {getSortedThemeKeys().map(themeKey =>
      <span key={themeKey}>
        <Button
          key={themeKey}
          onClick={() => setTheme(themeKey)}
          theme={themeKey === currentTheme ? 'primary' : 'secondary'}
        >
          {themeKey} theme
        </Button>
        <Space />
      </span>
    )}
  </div>
);

SwitchTheme.propTypes = {
  currentTheme: React.PropTypes.string,
  setTheme: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  currentTheme: state.themes.currentTheme || 'initial',
}), { setTheme })(SwitchTheme);
