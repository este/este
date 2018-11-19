// @flow
import React from 'react';
import Button from './Button';
import useTheme from '../../hooks/useTheme';
import { lightTheme } from '../../themes/theme';
import { useSetThemeMutation } from '../../mutations/SetThemeMutation';

export default function SetTheme() {
  const theme = useTheme();
  const [commit, pending] = useSetThemeMutation();

  const toggleThemeName = theme === lightTheme ? 'Dark' : 'Light';

  function toggleTheme() {
    const themeName = toggleThemeName.toLowerCase();
    commit({ themeName });
  }

  return (
    <Button color="primary" onPress={() => toggleTheme()} disabled={pending}>
      {`${toggleThemeName} Theme`}
    </Button>
  );
}
