// @flow
import Box, { type BoxProps } from '../components/box';
import withTheme, { type ThemeContext } from './withTheme';

export type FieldsetProps = BoxProps & {
  vertical?: boolean,
};

const Fieldset = (props: FieldsetProps, { theme }: ThemeContext) => {
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

withTheme(Fieldset);

export default Fieldset;
