// @flow
import Box, { type BoxProps } from '../components/box';
import withTheme, { type ThemeContext } from './withTheme';

export type ButtonsProps = BoxProps & {
  vertical?: boolean,
};

const Buttons = (props: ButtonsProps, { theme }: ThemeContext) => {
  const {
    vertical,
    flexDirection = vertical ? 'column' : 'row',
    flexWrap = 'wrap',
    marginBottom = 1,
    marginHorizontal = -theme.button.marginHorizontal,
    ...restProps
  } = props;
  return (
    <Box
      {...{
        flexDirection,
        flexWrap,
        marginBottom,
        marginHorizontal,
        ...restProps,
      }}
    />
  );
};

withTheme(Buttons);

export default Buttons;
