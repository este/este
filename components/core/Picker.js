// @flow
import * as React from 'react';
import { Picker as NativePicker } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import ThemeContext from './ThemeContext';

// https://github.com/necolas/react-native-web/issues/879
NativePicker.propTypes = null;

type PickerProps = {|
  disabled?: boolean,
  size?: number,
  style?: ViewStyleProp,
|};

class Picker extends React.PureComponent<PickerProps> {
  static Item = NativePicker.Item;

  render() {
    const { disabled, size = 0, style, ...props } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <NativePicker
            enabled={!disabled}
            style={[
              theme.styles.picker,
              theme.typography.fontSizeWithLineHeight(size),
              style,
            ]}
            {...props}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Picker;
