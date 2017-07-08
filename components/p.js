// @flow
import Text, { type TextProps } from './text';
import withTheme, { type ThemeContext } from './with-theme';

const P = (props: TextProps, { theme }: ThemeContext) => {
  const { marginBottom = theme.p.marginBottom, ...restProps } = props;
  return <Text marginBottom={marginBottom} {...restProps} />;
};

withTheme(P);

export default P;
