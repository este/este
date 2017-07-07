// @flow
import Text, { type TextProps } from './text';
import injectTheme, { type ThemeProps } from './inject-theme';

const P = (props: TextProps & ThemeProps) => {
  const { theme, marginBottom = theme.p.marginBottom, ...restProps } = props;
  return <Text marginBottom={marginBottom} {...restProps} />;
};

export default injectTheme(P);
