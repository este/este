/* @flow */
import type { Theme } from '../themes';
import React from 'react';
import { createComponent } from 'react-fela';

const Toolbar = createComponent((props: { theme: Theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: props.theme.colors.primary,
  marginTop: `${props.theme.scales.medium}px`,
  // padding: ${props => props.theme.scale[1]}px;
  // padding-left: ${props => props.theme.scale[0]}px;
  // padding-right: ${props => props.theme.scale[0]}px;
  // > * {
  //   margin-left: ${props => props.theme.scale[0]}px;
  //   margin-right: ${props => props.theme.scale[0]}px;
  // }
}));

export default Toolbar;
