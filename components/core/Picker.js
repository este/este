// @flow
import * as React from 'react';
import { Picker as NativePicker } from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Theme from './Theme';

// https://github.com/necolas/react-native-web/issues/879
NativePicker.propTypes = null;

type PickerProps = {
  disabled?: boolean,
  size?: number,
  style?: ViewStyleProp,
  itemStyle?: TextStyleProp,
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
              theme.styles.picker,
              theme.styles.pickerItem,
              style,
              itemStyle,
              disabled === true && theme.styles.stateDisabled,
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
