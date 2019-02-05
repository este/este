import Router from 'next/router';
import nprogress from 'nprogress';
import React from 'react';

// Don't show progress for fast transitions.
const startDelay = 1000;

interface NProgressProps {
  color: string;
}

const NProgress: React.FunctionComponent<NProgressProps> = ({ color }) => {
  const timeoutRef = React.useRef<number | null>(null);

  const show = () => {
    // Some weird VSCode bug. Enforce browser setTimeout via window.
    // https://github.com/Microsoft/TypeScript/issues/842#issuecomment-339860768
    timeoutRef.current = window.setTimeout(() => nprogress.start(), startDelay);
  };

  const hide = () => {
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    nprogress.done();
  };

  React.useEffect(() => {
    Router.events.on('routeChangeStart', show);
    Router.events.on('routeChangeComplete', hide);
    Router.events.on('routeChangeError', hide);

    return () => {
      Router.events.off('routeChangeStart', show);
      Router.events.off('routeChangeComplete', hide);
      Router.events.off('routeChangeError', hide);
      hide();
    };
  });

  return (
    <style jsx global>{`
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
      }
    `}</style>
  );
};

export default NProgress;
