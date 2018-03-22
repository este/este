// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import Theme from './Theme';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = TextProps & { inline?: boolean };

class Button extends React.PureComponent<ButtonProps> {
  render() {
    const { inline, color, style, ...props } = this.props;
    return (
      <Theme>
        {theme => (
          <TouchableOpacity>
            <Text
              fixWebFontSmoothing={!!color}
              style={[
                theme.styles.button.text,
                inline == null && theme.styles.button.spaced,
                style,
                color != null && theme.styles.button[color],
              ]}
              {...props}
            />
          </TouchableOpacity>
        )}
      </Theme>
    );
  }
}

export default Button;
