// @flow
import Page from '../components/page';
import app from '../lib/app';

const About = () => (
  <Page title="About">
    <div>about</div>
  </Page>
);

About.getInitialProps = async () =>
  new Promise(resolve => {
    setTimeout(() => resolve({ foo: 123 }), 1200);
  });

export default app(About);
