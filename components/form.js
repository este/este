// @flow
import Box, { type BoxProps } from './box';

type FormProps = BoxProps & {
  onSubmit?: EventHandler,
};

const onSubmitWithPreventDefault = onSubmit => event => {
  event.preventDefault();
  if (!onSubmit) return;
  onSubmit(event);
};

const Form = ({ onSubmit, ...props }: FormProps) => (
  <Box
    as={'form'}
    onSubmit={onSubmitWithPreventDefault(onSubmit)}
    style={(theme, mixStyles) => {
      const {
        marginBottom = theme.form.marginBottom,
        maxWidth = theme.form.maxWidth,
        ...restProps
      } = mixStyles(props);
      return { marginBottom, maxWidth, ...restProps };
    }}
  />
);

export default Form;
