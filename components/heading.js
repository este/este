// @flow
import Text, { type TextProps } from './text';
import injectTheme, { type ThemeProp } from './inject-theme';

const Heading = (props: TextProps & ThemeProp) => {
  const {
    theme,
    bold = true,
    fontFamily = theme.heading.fontFamily,
    marginBottom = theme.heading.marginBottom,
    ...restProps
  } = props;
  return (
    <Text
      bold={bold}
      fontFamily={fontFamily}
      marginBottom={marginBottom}
      {...restProps}
    />
  );
};

export default injectTheme(Heading);
