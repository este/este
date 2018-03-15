// @flow
import * as React from 'react';
import Box, { type BoxProps } from './Box';
import Theme from './Theme';

// Something like Fieldset, but for any component and with axis and spacing.
// It's Box with flexDirection, flexWrap, spacing, and default marginBottom.

export type SetProps = {
  spaceBetween?: number,
  vertical?: boolean,
} & BoxProps;

class Set extends React.PureComponent<SetProps> {
  static Space = ({ spaceBetween }: *) => (
    <Box height={spaceBetween} width={spaceBetween} />
  );

  // Believe or not, this is the most easy and robust approach for inner spacing.
  static addSpaceBetween = (children: *, spaceBetween: *) => {
    const childrenArray = React.Children.toArray(children);
    const spacedArray = [];
    childrenArray.forEach((child, i) => {
      spacedArray.push(child);
      if (childrenArray.length === 1) return;
      if (i === childrenArray.length - 1) return;
      // eslint-disable-next-line react/no-array-index-key
      spacedArray.push(<Set.Space key={`s${i}`} spaceBetween={spaceBetween} />);
    });
    return spacedArray;
  };

  render() {
    return (
      <Theme>
        {theme => {
          const {
            children,
            vertical = false,
            spaceBetween = vertical
              ? theme.set.verticalSpaceBetween
              : theme.set.horizontalSpaceBetween,
            flexDirection = vertical ? 'column' : 'row',
            flexWrap = 'wrap',
            marginBottom = theme.set.marginBottom,
            ...props
          } = this.props;

          return (
            <Box
              flexDirection={flexDirection}
              flexWrap={flexWrap}
              marginBottom={marginBottom}
              {...props}
            >
              {spaceBetween === 0
                ? children
                : Set.addSpaceBetween(children, spaceBetween)}
            </Box>
          );
        }}
      </Theme>
    );
  }
}

export default Set;
