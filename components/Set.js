// @flow
import React from 'react';
import Box, { type BoxProps } from './Box';
import withTheme, { type ThemeContext } from './withTheme';

// Something like Fieldset, but for any component and with axis and spacing.
// It's Box with flexDirection, flexWrap, spacing, and default marginBottom.

export type SetProps = {
  spaceBetween?: number,
  vertical?: boolean,
} & BoxProps;

const Space = ({ spaceBetween }) => (
  <Box height={spaceBetween} width={spaceBetween} />
);

// Believe or not, this is the most easy and robust approach for inner spacing.
const addSpaceBetween = (children, spaceBetween) => {
  const childrenArray = React.Children.toArray(children);
  const spacedArray = [];
  childrenArray.forEach((child, i) => {
    spacedArray.push(child);
    if (childrenArray.length === 1) return;
    if (i === childrenArray.length - 1) return;
    // eslint-disable-next-line react/no-array-index-key
    spacedArray.push(<Space key={`s${i}`} spaceBetween={spaceBetween} />);
  });
  return spacedArray;
};

const Set = (props: SetProps, { theme }: ThemeContext) => {
  const {
    children,
    vertical = false,
    spaceBetween = vertical
      ? theme.set.verticalSpaceBetween
      : theme.set.horizontalSpaceBetween,
    flexDirection = vertical ? 'column' : 'row',
    flexWrap = 'wrap',
    marginBottom = theme.set.marginBottom,
    ...restProps
  } = props;
  return (
    <Box
      {...{
        flexDirection,
        flexWrap,
        marginBottom,
        ...restProps,
      }}
    >
      {spaceBetween === 0 ? children : addSpaceBetween(children, spaceBetween)}
    </Box>
  );
};

withTheme(Set);

export default Set;
