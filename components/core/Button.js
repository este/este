// @flow
import * as React from 'react';
import type { ColorName } from '../../themes/types';
import Text, { type TextProps } from './Text';
import Theme from './Theme';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = TextProps;

class Button extends React.PureComponent<ButtonProps> {
  render() {
    const { color, style, ...props } = this.props;
    return (
      <Theme>
        {theme => (
          <TouchableOpacity>
            <Text
              fixWebFontSmoothing={!!color}
              style={[
                theme.styles.button.text,
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
