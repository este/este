// @flow
import Box, { type BoxProps } from './box';
import injectTheme, { type ThemeProp } from './inject-theme';

// Render form as form in browser, because auth data or whatever pre-filling.
const BrowserForm = ({ onSubmit, ...restProps }: { onSubmit: () => void }) =>
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <form
    {...restProps}
    onKeyPress={(e: KeyboardEvent) => {
      if (e.target.tagName !== 'INPUT') return;
      if (e.key !== 'Enter') return;
      if (typeof onSubmit !== 'function') return;
      onSubmit();
    }}
    onSubmit={(e: Event) => e.preventDefault()}
  />;

type FormProps = BoxProps & {
  onSubmit?: () => any,
};

const Form = (props: FormProps & ThemeProp) => {
  const {
    theme,
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

export default injectTheme(Form);
