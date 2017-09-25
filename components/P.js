// @flow
import React from 'react';
import Text, { type TextProps } from './Text';
import withTheme, { type WithTheme } from './withTheme';

type PProps = TextProps;

const P = ({
  theme,
  marginBottom = theme.p.marginBottom,
  maxWidth = theme.p.maxWidth,
  ...props
}) => <Text marginBottom={marginBottom} maxWidth={maxWidth} {...props} />;

const PWithTheme: WithTheme<PProps> = withTheme(P);

export default PWithTheme;
