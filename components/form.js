// @flow
import Box, { type BoxProps } from './box';
import withTheme, { type ThemeContext } from './withTheme';

// Render form as form in browser, because auth data or whatever pre-filling.
const BrowserForm = props => (
  <form {...props} onSubmit={(e: Event) => e.preventDefault()} />
);

type FormProps = BoxProps;

const Form = (props: FormProps, { theme }: ThemeContext) => {
  const {
    as = BrowserForm,
    marginBottom = theme.form.marginBottom,
    maxWidth = theme.form.maxWidth,
    ...restProps
  } = props;
  return (
    <Box
      as={as}
      marginBottom={marginBottom}
      maxWidth={maxWidth}
      {...restProps}
    />
  );
};

withTheme(Form);

export default Form;
