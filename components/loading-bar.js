// @flow
import NProgress from 'nprogress';
import Router from 'next/router';

// Don't show progress for fast transitions.
const startDelay = 500;
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

// TODO: Use theme primary color for bg.
const LoadingBar = () =>
  <style jsx global>
    {`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: #228ae6;
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
        box-shadow: 0 0 10px #228ae6, 0 0 5px #228ae6;
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }`}
  </style>;

export default LoadingBar;
