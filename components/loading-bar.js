// @flow
import NProgress from 'nprogress';
import Router from 'next/router';

let timer = null;

Router.onRouteChangeStart = () => {
  timer = setTimeout(() => NProgress.start(), 1000);
};

Router.onRouteChangeComplete = () => {
  clearTimeout(timer);
  NProgress.done();
};

Router.onRouteChangeError = () => {
  clearTimeout(timer);
  NProgress.done();
};

const LoadingBar = () => (
  <style jsx global>
    {
      `
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: #ff9300;
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
        box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
      `
    }
  </style>
);

export default LoadingBar;
