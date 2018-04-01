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
  itemStyle?: StyleObj,
};

class Picker extends React.PureComponent<PickerProps> {
  static Item = NativePicker.Item;

  render() {
    const { disabled, size = 0, style, itemStyle, ...props } = this.props;
    return (
      <Theme>
        {theme => (
          <NativePicker
            enabled={!disabled}
            style={[
              // TODO: Use itemStyle props once supported.
              // https://github.com/necolas/react-native-web/issues/882
              theme.styles.picker.style,
              theme.styles.picker.itemStyle,
              style,
              itemStyle,
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
