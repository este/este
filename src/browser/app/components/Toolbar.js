/* @flow */
import type { Theme } from '../themes';
import React from 'react';
import { createComponent } from 'react-fela';

const Toolbar = createComponent((props: { theme: Theme }) => ({
  alignItems: 'center',
  backgroundColor: props.theme.colors.primary,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: `${props.theme.scales.medium}px`,
  paddingBottom: `${props.theme.scales.medium}px`,
  paddingLeft: `${props.theme.scales.small}px`,
  paddingRight: `${props.theme.scales.small}px`,
  paddingTop: `${props.theme.scales.medium}px`,
  '> *': {
    marginLeft: `${props.theme.scales.small}px`,
    marginRight: `${props.theme.scales.small}px`,
  },
}));

export default Toolbar;
