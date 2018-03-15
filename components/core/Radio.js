// @flow
import * as React from 'react';
import Button, { type ButtonProps } from './Button';
import Set from './Set';
import SvgIcon from './SvgIcon';
import Text from './Text';
import Theme from './Theme';

export type RadioProps = {
  label?: string,
  labelOnLeft?: boolean,
  onChange?: (value: string) => any,
  select: string,
  value: ?string,
} & ButtonProps;

class Radio extends React.PureComponent<RadioProps> {
  render() {
    return (
      <Theme>
        {theme => {
          const {
            label,
            labelOnLeft = false,
            onChange,
            select,
            value,
            color,
            marginVertical = 0,
            paddingHorizontal = 0,
            paddingVertical = 0,
            size,
            ...props
          } = this.props;
          return (
            <Button
              aria-checked={value === select}
              onPress={() => {
                if (typeof props.onPress === 'function') props.onPress();
                if (!onChange) return;
                onChange(select);
              }}
              role="radio"
              size={size}
              marginVertical={marginVertical}
              paddingHorizontal={paddingHorizontal}
              paddingVertical={paddingVertical}
              {...props}
            >
              <Set
                marginBottom={0}
                flexDirection={labelOnLeft ? 'row' : 'row-reverse'}
                justifyContent={labelOnLeft ? 'flex-start' : 'flex-end'}
              >
                {label != null && (
                  <Text color={color} size={size}>
                    {label}
                  </Text>
                )}
                <SvgIcon
                  color={color}
                  size={size}
                  svg={
                    value === select
                      ? theme.radio.checkedIcon
                      : theme.radio.uncheckedIcon
                  }
                />
              </Set>
            </Button>
          );
        }}
      </Theme>
    );
  }
}

export default Radio;
