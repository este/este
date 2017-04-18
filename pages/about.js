// @flow
import Page from '../components/page';
import Box from '../components/box';
import app from '../lib/app';

const About = () => (
  <Page title="About">
    <Box>about</Box>
  </Page>
);

About.getInitialProps = async () =>
  new Promise(resolve => {
    setTimeout(() => resolve({ foo: 123 }), 750);
  });

export default app(About);
