// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import withTheme from './withTheme';

type PProps = TextProps;

const P = ({
  theme,
  marginBottom = theme.p.marginBottom,
  maxWidth = theme.p.maxWidth,
  ...props
}) => <Text marginBottom={marginBottom} maxWidth={maxWidth} {...props} />;

const PWithTheme: React.ComponentType<PProps> = withTheme(P);

export default PWithTheme;
