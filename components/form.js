// @flow
import Box, { type BoxProps } from './box';
import withTheme, { type ThemeContext } from './withTheme';

type FormProps = BoxProps & {
  onSubmit?: EventHandler,
};

const onSubmitWithPreventDefault = onSubmit => event => {
  event.preventDefault();
  if (!onSubmit) return;
  onSubmit(event);
};

const Form = ({ onSubmit, ...props }: FormProps, { theme }: ThemeContext) => {
  const {
    as = 'form',
    marginBottom = theme.form.marginBottom,
    maxWidth = theme.form.maxWidth,
    ...restProps
  } = props;
  return (
    <Box
      as={as}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      onSubmit={onSubmitWithPreventDefault(onSubmit)}
      {...restProps}
    />
  );
};

withTheme(Form);

export default Form;
