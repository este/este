// @flow
import React from 'react';
import defaultTheme from '../themes/defaultTheme';
import { createComponent } from 'react-fela';

const color = defaultTheme.colors.primary;

const LoadingBar = (props: any, { renderer }: any) => {
  const opacity = renderer.renderKeyframe(() => ({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  }));

  const Component = createComponent(() => ({
    animation: `${opacity} 3s ease-out 0.3s infinite`,
    background: color,
    boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
    height: 1,
    left: 0,
    opacity: 0,
    pointerevents: 'none',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1031,
  }));

  return <Component />;
};

LoadingBar.contextTypes = {
  renderer: React.PropTypes.object,
};

export default LoadingBar;
