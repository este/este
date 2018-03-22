// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import type { Theme } from '../../themes/types';
import Button from './Button';
import { browserTheme } from '../../themes/browserTheme';
import Mutation from './Mutation';
import UpdateUserMutation from '../../mutations/UpdateUserMutation';

type Value = Theme;

const ThemeContext: Context<Value> = createReactContext(browserTheme);

export const ThemeProvider = ThemeContext.Provider;

export const ToggleTheme = () => (
  <Mutation>
    {({ mutate, pending }) => (
      <ThemeContext.Consumer>
        {theme => {
          const themeName = theme === browserTheme ? 'dark' : 'light';
          return (
            <Button
              color="primary"
              onPress={() =>
                mutate(UpdateUserMutation.commit, { input: { themeName } })
              }
              disabled={pending}
            >
              {`${themeName} theme`}
            </Button>
          );
        }}
      </ThemeContext.Consumer>
    )}
  </Mutation>
);

// Maybe one day I will rewrite it to higher order component, but not today.
// Function as child component is easier to write, use, and Flow type.
export default ThemeContext.Consumer;
