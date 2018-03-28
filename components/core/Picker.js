// @flow
import * as React from 'react';
import { Picker as NativePicker } from 'react-native';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Theme from './Theme';

// https://github.com/necolas/react-native-web/issues/879
NativePicker.propTypes = null;

type PickerProps = {
  disabled?: boolean,
  size?: number,
  style?: StyleObj,
};

class Picker extends React.PureComponent<PickerProps> {
  static Item = NativePicker.Item;

  render() {
    const { disabled, size = 0, style, ...props } = this.props;
    return (
      <Theme>
        {theme => (
          <NativePicker
            enabled={!disabled}
            style={[
              theme.styles.picker.style,
              style,
              disabled === true && theme.styles.states.disabled,
              theme.typography.fontSizeWithLineHeight(size),
            ]}
            {...props}
          />
        )}
      </Theme>
    );
  }
}

export default Picker;
