// @flow
import * as React from 'react';
import Button from './Button';
import { lightTheme } from '../../themes/theme';
import Mutation from './Mutation';
import UpdateUserMutation from '../../mutations/UpdateUserMutation';
import ThemeContext from './ThemeContext';

class ToggleTheme extends React.PureComponent<{}> {
  render() {
    return (
      <Mutation>
        {({ mutate, pending }) => (
          <ThemeContext.Consumer>
            {theme => {
              const themeName = theme === lightTheme ? 'dark' : 'light';
              return (
                <Button
                  color="primary"
                  onPress={() =>
                    mutate(UpdateUserMutation.commit, { themeName })
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
  }
}

export default ToggleTheme;
