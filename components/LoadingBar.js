// @flow
import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';

// Don't show progress for fast transitions.
const startDelay = 1000;
let timer = null;

Router.onRouteChangeStart = () => {
  timer = setTimeout(() => NProgress.start(), startDelay);
};

Router.onRouteChangeComplete = () => {
  clearTimeout(timer);
  NProgress.done();
};

Router.onRouteChangeError = () => {
  clearTimeout(timer);
  NProgress.done();
};

type Props = {
  color: string,
};

const getStyle = color => `
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: ${color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
}`;

const LoadingBar = ({ color }: Props) => (
  <Head>
    <style dangerouslySetInnerHTML={{ __html: getStyle(color) }} />
  </Head>
);

export default LoadingBar;
