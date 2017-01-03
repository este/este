// @flow
import Box from './Box';
import Button from './Button';
import React from 'react';
import Text from './Text';
import styled from './styled';

// Checkbox with SVG icon.
// We can use any icon from:
//  flaticon.com
//  thenounproject.com

type CheckboxProps = {|
  disabled?: boolean,
  field: Object, // TODO: Type Field from fields.
  label?: string,
  size?: number,
|};

const CheckedIcon = () => (
  <svg
    viewBox="0 0 32 32"
    style={{
      // width: 'auto',
      height: '16px',
    }}
  >
    <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
  </svg>
);

const Checkbox = ({
  disabled,
  field,
  label,
  size = 0,
}: CheckboxProps) => (
  <Button
    display="flex"
    inline
    onClick={() => {field.onChange({ value: !field.value })}}
    paddingHorizontal={0}
    style={{ outline: 'none' }} // TODO: Add something.
  >
    {/* TODO: As component */}
    <Box
      alignItems="center"
      display="flex"
      // backgroundColor="primary"
    >{field.value ?
      (function() {
        const SVG = <svg
          viewBox="0 0 32 32"
          // style={{
          //   // fill: 'red',
          //   width: '16px',
          //   height: '16px',
          // }}
        >
          <path d="M2 15 L6 11 L14 19 L28 5 L32 9 L14 27 z" />
        </svg>;
        const StyledSVG = styled((theme, { size }) => ({
          height: theme.typography.fontSize(size),
          width: theme.typography.fontSize(size),
        }), ({className}) => {
          console.log(className);
          return React.cloneElement(SVG, { className });
        });
        return <StyledSVG size={size} />;
        // return React.cloneElement(SVG, {
        //   style: {
        //     width: '16px',
        //     height: '16px',
        //   }
        // })
      })()
    :
      '[]'
    }</Box>
    <Text
      marginLeft={0.5}
      size={size}
    >{label}</Text>
  </Button>
  //     size={size}
  //   >
  //     {'\u00A0'}
  //   </Text>
  //   <Text size={size}>{label}</Text>
  // </Box>
);

export default Checkbox;
